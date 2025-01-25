import React from "react";

function contents(props) {
  const contents = props.contents;
  return (
    <div className="content">
      {contents.map((content) => (
        <div className="content-preview" key={content.id}>
          <h4>{content.author}</h4>
          <h2>{content.title}</h2>
          <p> {content.body} </p>
        </div>
      ))}
    </div>
  );
}

export default contents;
