import React from "react";
import dotenv from "dotenv";
 //dotenv.config();
// Function to detect URLs in text
const extractUrls = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

const extractGoogleMapsEmbedUrl = (text) => {
  const urls = extractUrls(text);
  const mapsUrl = urls.find((url) => url.includes("google.com/maps"));
  
  if (!mapsUrl) return null;

  let embedUrl = "";

  // Convert different types of Google Maps URLs to an embeddable format
  if (mapsUrl.includes("/maps/place/")) {
    // Extract location name from "/maps/place/LOCATION/"
    const placeName = mapsUrl.split("/maps/place/")[1]?.split("/")[0]?.replace(/\+/g, " ");
    embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.VITE_GMAP_KEY}&q=${encodeURIComponent(placeName)}`;
  } else if (mapsUrl.includes("/@")) {
    // Extract latitude and longitude from URLs containing "@LAT,LNG,"
    const latLng = mapsUrl.split("/@")[1]?.split(",")[0] + "," + mapsUrl.split("/@")[1]?.split(",")[1];
    embedUrl = `https://www.google.com/maps/embed/v1/view?key=${process.env.VITE_GMAP_KEY}&center=${latLng}&zoom=14`;
  }

  return embedUrl || null;
};

function Contents({ contents }) {
  //console.log(contents);

  // Check if contents object is not empty
  if (contents && Object.keys(contents).length > 0) {
    const googleMapsEmbedUrl = extractGoogleMapsEmbedUrl(contents.body);
    const allUrls = extractUrls(contents.body);
    const otherUrls = allUrls.filter((url) => !url.includes("google.com/maps"));

    return (
      <div className="content">
        <div className="content-preview" key={contents.id}>
          <h4>{contents.author}</h4>
          <h2>{contents.title}</h2>

          {/* Render content body with clickable links */}
          <p
            // Use dangerouslySetInnerHTML to parse and render the raw HTML content
            dangerouslySetInnerHTML={{ __html: contents.body }}
          />

          {/* Google Maps Embed (if location is provided) */}
          {googleMapsEmbedUrl && (
            <div className="map-preview">
              <iframe
                title="Google Map Location"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "10px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={googleMapsEmbedUrl}/*{`https://www.google.com/maps/embed/v1/place?key=${process.env.GMAP_KEY}&q=${encodeURIComponent(
                  contents.location
                )}`}*/
              ></iframe>
            </div>
          )}

          {/* URL Preview */}
          {/*extractUrls(contents.body)*/otherUrls.map((url, index) => {
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
                  <img
                    src={url}
                    alt="Preview"
                    width="100%"
                    style={{ borderRadius: "10px" }}
                  />
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
      </div>
    );
  }

  return <p>No content found</p>;
}

export default Contents;
