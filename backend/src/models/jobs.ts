import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Job = new Schema({
    JobID:{
        type: Number
    },
    agency: {
        type: String
    },
    id: {
        type: Number
    },
    period: {
        type: String
    },
    client:{
        type: String
    },
    status:{
        type: String
    },
    accepted: {
        type: String
    },
    offer: {
        type: String
    },
    employees: {
        type:Number
    },
    reason: {
        type: String
    }
})

export default mongoose.model("JobModule", Job, 'jobs')