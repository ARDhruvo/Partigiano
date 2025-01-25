import React from "react";
import { useParams } from "react-router-dom";
import Contents from "./contents";
import { useState } from "react";

function blogBody() {
  const { id } = useParams();

  const [contents, setContents] = useState([
    {
      title: "Hello Education",
      body: "Lorem ipsen......",
      author: "Nazim",
      id: "1",
    },
    {
      title: "Hello Emergency",
      body: "Lorem ipsen......",
      author: "Raian",
      id: "2",
    },
    {
      title: "Hello Education1",
      body: "Lorem ipsen......",
      author: "Khan",
      id: "3",
    },
  ]);

  return (
    <div className="homeTitle">
      <Contents contents={contents.filter((content) => content.id === id)} />
    </div>
  );
}

export default blogBody;
