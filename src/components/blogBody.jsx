import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Contents from "./contents";

function BlogBody() {
  const { id } = useParams();

  const [contents, setContents] = useState([
    {
      title: "Hello Education",
      body: "Lorem ipsen......",
      author: "Nazim",
      id: "1",
      likes: 0,
    },
    {
      title: "Hello Emergency",
      body: "Lorem ipsen......",
      author: "Raian",
      id: "2",
      likes: 0,
    },
    {
      title: "Hello Education1",
      body: "Lorem ipsen......",
      author: "Khan",
      id: "3",
      likes: 0,
    },
    {
      title: "Hello Emergency2",
      body: "Lorem ipsen......",
      author: "NRK",
      id: "4",
      likes: 4,
    },
  ]);

  const handleLike = (postId) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === postId ? { ...content, likes: content.likes + 1 } : content
      )
    );
  };

  return (
    <div className="homeTitle">
      {contents
        .filter((content) => content.id === id)
        .map((content) => (
          <div key={content.id} className="post-container">
            <Contents contents={[content]} />
            <div className="button-container" style={{ marginLeft: "40px" }}>
              <button className="like-button" onClick={() => handleLike(content.id)}>
                Like ({content.likes})
              </button>
              <button className="report-button" style={{ marginLeft: "10px" }}>
                Report
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BlogBody;
