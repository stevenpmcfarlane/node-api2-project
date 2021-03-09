// implement your posts router here
const express = require("express");
const { get } = require("../server");
const router = express.Router();
const Post = require("./posts-model");

router.get("/", (req, res) => {
  post
    .find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
        realError: error.message,
      });
    });
});

router.get("/:id", (req, res) => {
  post
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

router.get("/:id/posts", (req, res) => {
  post
    .findPosts(req.params.id)
    .then((posts) => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "No posts for this post" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving this post",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  get
    .findCommentById(req.params.id)
    .then((posts) => {
      if (posts.comments > 0) {
        res.status(200).json(posts.comments);
      } else {
        res.status(404).json({ message: "No comments for this post " });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error" });
    });
});

router.post("/", (req, res) => {
  post
    .add(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the post",
      });
    });
});

router.delete("/:id", (req, res) => {
  Post.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been nuked" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the adopter",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Post.update(req.params.id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the post",
      });
    });
});

module.exports = router;
