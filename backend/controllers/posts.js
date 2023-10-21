import mongoose from "mongoose";
import PostSchedule from "../models/postSchedule.js";

export const getPosts = async (req,res) => {
    try {
        const postSchedule = await PostSchedule.find();

        res.status(200).json(postSchedule);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req,res) => {
    const newPost = new PostSchedule(req.body);
    
    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost = await PostSchedule.findByIdAndUpdate(_id,post,{ new : true});

    res.json(updatePost);
}

export const deletePost = async (req,res) => {
    const { id:_id } = req.params;

    if(! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostSchedule.findByIdAndRemove(_id);
    
    res.json({message:'Post Deleted Successfully'});

}