import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    description:String,
    day:Date,
    start:String,
    end:String,
    location:String,
});

var PostSchedule = mongoose.model('PostSchedule',postSchema);
export default PostSchedule;