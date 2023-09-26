import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    mail: {
        type: String
    },
    phone: {
        type: String
    },
    name_of_agency: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    postal: {
        type: String
    },
    number_of_agency: {
        type: Number
    },
    description: {
        type: String
    },
    image:{
        type: String
    },
    status:{
        type: String
    },
    number_of_employees:{
        type: Number
    },
    total_number_of_employees:{
        type: Number
    },
    number_of_opening_positions:{
        type: Number
    }

})

export default mongoose.model("UserModule", User, 'users')