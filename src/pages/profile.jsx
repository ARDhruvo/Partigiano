import React from "react";
import Header from "../components/header";

function profile() {
  const user = {
    name: "Mohammad Yahya",
    username: "Yahya355",
    bio: "“How will we ever get out of this labyrinth of suffering?” ",
    avatar:
      "https://scontent.fdac27-2.fna.fbcdn.net/v/t39.30808-6/473080810_3424687591013849_3202325898518874554_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG0A2fZY6NzrObnN3px2mkxiFku6-PZdlyIWS7r49l2XDQvO1sU3iLELj5SgftCIXE_tHH1byrR_s2bsftUOxyn&_nc_ohc=I8pWpptdvzgQ7kNvgFUxY6O&_nc_zt=23&_nc_ht=scontent.fdac27-2.fna&_nc_gid=ADXQ7VnZfQJbx01t_V4j6PB&oh=00_AYBsFZWXGRFE6J37pP4cYOhLwZzLtfDfXOgAIztOXqSZUw&oe=679A617D",
    posts: [
      { id: 1, title: "My First Post", content: "Hello world!" },
      { id: 2, title: "My second Post", content: "The world is beautiful!" },
      {
        id: 3,
        title: "My third Post",
        content:
          "It's my experience that people are a lot more sympathetic if they can see you hurting, and for the millionth time in my life I wish for measles or smallpox or some other easily understood disease just to make it easier on me and also on them.",
      },
    ],
  };

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <img
          src={user.avatar}
          alt="Avatar"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
        <h2>{user.name}</h2>
        <p>@{user.username}</p>
        <p>{user.bio}</p>
      </div>
      <div className="home-content">
        <h3>Posts</h3>
        {user.posts.map((post) => (
          <div key={post.id} className="category-preview">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default profile;
