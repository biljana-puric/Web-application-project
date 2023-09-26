import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Objects = new Schema({
    id: {
        type: Number
    },
    object_type: {
        type: String
    },
    address: {
        type: String
    },
    rooms: {
        type: Number
    },
    space: {
        type: Number
    },
    client: {
        type: String
    },
    sketch: [{ x: Number, y: Number, width: Number, height: Number, door: [{x: Number, y: Number}], status: String, room_number: Number}]
})

export default mongoose.model("ObjectsModule", Objects, 'objects')