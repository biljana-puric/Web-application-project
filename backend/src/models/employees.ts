import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Employee = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    mail: {
        type: String
    },
    phone: {
        type: String
    },
    specialization: {
        type: String
    },
    agency: {
        type: String
    },
    status:{
        type:String
    },
    job:{
        type:Number
    }
})

export default mongoose.model("EmployeeModule", Employee, 'employees')