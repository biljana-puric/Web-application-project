import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema({
    id:{
        type: Number
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    comment:{
        type: String
    },
    grade: {
        type: Number
    },
    agency:{
        type: String
    }

})

export default mongoose.model("CommentsModule", Comment, 'comments')