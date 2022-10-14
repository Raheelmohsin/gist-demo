import React from "react";
import { Avatar, Image } from "antd";

export const Forks = (data) => {
  const forks = data.forks.forks || [];
  console.log(forks);
  return (
    <div className="forksBox">
      <p>Forks:</p>
      {forks && forks.length !== 0 ? forks.map((fork, i) => (
          <ul key={i}>
          <li>
          <a
            href={`https://gist.github.com/${fork.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Avatar
              src={<Image src={fork.user.avatar_url} />}
              style={{ margin: 5 }}
            />
            {fork.user.login}
          </a>
        </li>
        </ul>
      )) : <p>No forks found.</p>}
    </div>
  );
};
