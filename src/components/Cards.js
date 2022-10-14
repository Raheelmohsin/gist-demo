import React, { useState } from "react";
import { getSingleGistUrl } from "./config";
import { Card, Button, Tag, Divider } from "antd";
import { FileBox } from "./FileBox";
import { Forks } from "./Forks";

export const Cards = (gistData) => {
  const unidata = gistData.gistData;
  const files = unidata.files;
  const fileArr = [];
  for (let file in files) {
    let language = files[file].language;
    //remove duplicate file types
    if (fileArr.indexOf(language) === -1) {
      fileArr.push(language);
    }
  }

  const noOfFiles = Object.keys(files).length;

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const moreOpen = async (value) => {
    if (value !== "") {
      try {
        const URL = getSingleGistUrl(value);
        const res = await fetch(URL);
        const data = await res.json();
        setData(data);
        setShow(true);
      } catch (e) {
        console.log(e);
        setShow(false);
      }
    }
  };
  return (
    <div className="site-card-wrapper">
      <Card
        title={unidata.description || "No Description"}
        bordered={false}
        extra={
          <Button type="secondary" onClick={() => moreOpen(`/${unidata.id}`)}>
            More Detail
          </Button>
        }
      >
        <p className="numberFiles">
          {noOfFiles} {noOfFiles > 1 ? "Files" : "File"}
        </p>

        <div>
          {fileArr.map((language, index) => {
            return (
              <Tag color="geekblue" key={index}>
                {language}
              </Tag>
            );
          })}
        </div>

        <FileBox filelist={files} />

        {show && data !== [] ? <Forks forks={data} /> : null}
      </Card>
      <Divider dashed />
    </div>
  );
};
