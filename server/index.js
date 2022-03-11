const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://omg:qkrdmsqls1@cluster0.sp0du.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("good" + `${port}`);
      console.log("Connecting MongoDB...");
    })
    .catch((err) => console.log(`${err}`));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//무조건 index 로 들어오도록
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/post/submit", (req, res) => {
  let temp = req.body;

  const CommunityPost = new Post(temp);
  CommunityPost.save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

//1. Post MongoDB Model
//2. Clinet CSS
