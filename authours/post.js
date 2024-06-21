import bcrypt from "bcrypt"
import express, { Router } from "express"
import User from "../model/uder.js"
import Post from "../model/Post.js"

const PostRoute =  express.Router()

PostRoute.post("/", async (req, res) => {
    const createnewpost = new Post(req.body);
    try {
        const savedpost = await createnewpost.save();
        res.status(200).json(savedpost);
    } catch (error) {
        return res.status(500).json(error);
    }
});

PostRoute.put("/:id", async (req, res) => {
    try {
        const upost = await Post.findById(req.params.id);

        if (upost.userId === req.body.userId) {
            await upost.updateOne({ $set: req.body });
            res.status(200).json("POST UPDATED");
        } else {
            res.status(403).json("POST NOT UPDATED");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});


PostRoute.delete("/:id", async (req, res) => {
    try {
        const upost = await Post.findById(req.params.id);

        if (upost.userId === req.body.userId) {
            await upost.deleteOne();
            res.status(200).json("Post deleted");
        } else {
            res.status(403).json("Post Not deleted");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});


PostRoute.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.Likes.includes(req.body.userId)) {
            await post.updateOne({$push: {Likes: req.body.userId}});
            res.status(200).json("like added");
        } else {
            await post.updateOne({$pull: {Likes: req.body.userId}});
            res.status(200).json("dislike");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});


// getpost

PostRoute.get("/:id", async (req, res)=>{
    try {
        
const post =  await Post.findById(req.params.id);


res.status(200).json(post)

    } catch (error) {
        res.status(403).json("post not found")
    }
})


1
PostRoute.get("/timeline/all", async (req, res)=>{
    try {
        
const currentuser =  await User.findById(req.params.id);
const userpost = await Post.find({userId: currentuser._id})
const friendlist = Promise.all(
    currentuser.followings.map((friendid)=>{
        Post.find({userId: friendid})
    })
) ;  
res.json(userpost.concat(...friendlist))


    } catch (error) {
        res.status(500).json("post not found")
    }
})



export   { PostRoute }
