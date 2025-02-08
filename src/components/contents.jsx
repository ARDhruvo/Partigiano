import React from "react";

// Function to detect URLs in text
const extractUrls = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

function Contents({ contents }) {
  return (
    <div className="content">
      {contents.length > 0 ? (
        contents.map((content) => (
          <div className="content-preview" key={content.id}>
            <h4>{content.author}</h4>
            <h2>{content.title}</h2>

            {/* Render content body with clickable links */}
            <p>
              {content.body.split(" ").map((word, index) => {
                return extractUrls(word).length > 0 ? (
                  <a key={index} href={word} target="_blank" rel="noopener noreferrer">
                    {word}{" "}
                  </a>
                ) : (
                  word + " "
                );
              })}
            </p>

            {/* Google Maps Embed (if location is provided) */}
            {content.location && (
              <div className="map-preview">
                <iframe
                  title="Google Map Location"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "10px" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAHIzeds49klUEvVnKQ1ZwQTvacId8tAvw&q=${encodeURIComponent(
                    content.location
                  )}`}
                ></iframe>
              </div>
            )}

            {/* URL Preview */}
            {extractUrls(content.body).map((url, index) => {
              // Check if URL is a YouTube Video
              if (url.includes("youtube.com") || url.includes("youtu.be")) {
                return (
                  <div key={index} className="video-preview">
                    <iframe
                      width="100%"
                      height="300"
                      src={`https://www.youtube.com/embed/${url.split("v=")[1]}`}
                      title="YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              }

              // Check if URL is an Image
              if (url.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
                return (
                  <div key={index} className="image-preview">
                    <img src={url} alt="Preview" width="100%" style={{ borderRadius: "10px" }} />
                  </div>
                );
              }

              // Otherwise, show a Website Preview
              return (
                <div key={index} className="website-preview">
                  <iframe
                    title="Website Preview"
                    src={url}
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: "10px" }}
                    loading="lazy"
                  ></iframe>
                </div>
              );
            })}
          </div>
        ))
      ) : (
        <p>No content found</p>
      )}
    </div>
  );
}

export default Contents;
