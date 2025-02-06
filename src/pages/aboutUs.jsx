import React from "react";
import Header from "../components/header";

function AboutUs() {
  const teamMembers = [
    {
      name: "Nazim Raian",
      role: "Developer & Designer",
      bio: "Passionate about storytelling and freedom of expression.",
      avatar:
        "https://scontent.fdac27-2.fna.fbcdn.net/v/t39.30808-6/474441873_8933801143364608_1716148532418204934_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyMGSkxvIm6-TOARjG9nC8Wc9_PsEwBBxZz38-wTAEHP-LLOKg8tkK79jYyT0w0u7plg1mNPnw5-q0SdVTBwId&_nc_ohc=q6u9lT92UcwQ7kNvgFNxEZC&_nc_zt=23&_nc_ht=scontent.fdac27-2.fna&_nc_gid=ATTSRU3PLdpti5pf9ZdT_ZQ&oh=00_AYCKs9JpVMPMc7J2595U1jEV-SBr_F6HDPoWKU-7aXcmRw&oe=679AB6B7",
    },
    {
      name: "Md. Aribur Rahman Dhruvo",
      role: "Developer & Designer",
      bio: "Ensuring high-quality content with creativity and integrity.",
      avatar:
        "https://scontent.fdac27-2.fna.fbcdn.net/v/t39.30808-6/463385899_1030702125474008_4514660079567697957_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF_MSrcxGqDcMcQc6XR1tFVwkJ_pMWIZGbCQn-kxYhkZoGChU1JYs0IBFeo32zPeFzFZ318Ou-DfNQ5tcj73Hoh&_nc_ohc=l8Gu3eF0LcMQ7kNvgH7nUkE&_nc_zt=23&_nc_ht=scontent.fdac27-2.fna&_nc_gid=AcxtomqwTh0805hd1iDEFQO&oh=00_AYCuJXjKOVG0CqvComB57F2JuAwJ6kIq0Pjne0Q4yLb7pA&oe=679A9B60",
    },
    {
      name: "Mohammad Yahya",
      role: "Developer & Designer",
      bio: "Building a seamless and user-friendly blogging experience.",
      avatar:
        "https://scontent.fdac27-2.fna.fbcdn.net/v/t39.30808-6/473080810_3424687591013849_3202325898518874554_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG0A2fZY6NzrObnN3px2mkxiFku6-PZdlyIWS7r49l2XDQvO1sU3iLELj5SgftCIXE_tHH1byrR_s2bsftUOxyn&_nc_ohc=I8pWpptdvzgQ7kNvgFUxY6O&_nc_zt=23&_nc_ht=scontent.fdac27-2.fna&_nc_gid=ADXQ7VnZfQJbx01t_V4j6PB&oh=00_AYBsFZWXGRFE6J37pP4cYOhLwZzLtfDfXOgAIztOXqSZUw&oe=679A617D",
    },
  ];

  return (
   <> 
    <Header/>
    <div className="about-us-container">
      <h2>About Us</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img
              src={member.avatar}
              alt={member.name}
              style={{ borderRadius: "50%", width: "150px", height: "150px" }}
            />
            <h3>{member.name}</h3>
            <p>
              <strong>{member.role}</strong>
            </p>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h3>About Partigiano</h3>
        <p className="desc">
          Partigiano is a blogging platform that champions freedom of speech and
          expression. With various categories covering diverse topics, we
          provide a space for writers to share their thoughts, experiences, and
          opinions openly. Our mission is to create a community where ideas
          flourish without limitations.
        </p>
        .
      </div>
    </div>
    </> 
  );
}

export default AboutUs;
