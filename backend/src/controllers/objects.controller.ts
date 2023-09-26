import express from 'express'
import ObjectsModule from '../models/objects'
import {readFileSync} from 'fs'


export class ObjectsController{
    getAllObjects = (req: express.Request, r: express.Response)=>{
        let username = req.body.username
        ObjectsModule.find({"client": username}, (err, objects)=>{
            if(err) console.log(err)
            else r.json(objects)
        })
    }

    getMyInfo = (req: express.Request, response: express.Response) =>{
        let id = req.body.id;
        ObjectsModule.findOne({"id":id}, (err, obj)=>{
            if(err) console.log(err)
            else {
                response.json(obj);
            }
        })
    }

    deleteObject = (req: express.Request, response: express.Response) =>{
        let id = req.body.object_id;
        console.log(id)
        ObjectsModule.deleteOne({"id":id}, (err, obj)=>{
            if(err) console.log(err)
            else response.json({"message":"ok"});
        })
    }

    uploadObject = (req: express.Request, response: express.Response) =>{
        var i=0;
        ObjectsModule.find({}).sort({id: -1}).limit(1).exec((err, r)=>{
            i = r[0].id +1
            let obj = new ObjectsModule({
                id: i,
                client: req.body.client,
                object_type: req.body.object_type,
                address: req.body.address,
                rooms: req.body.rooms,
                space: req.body.space,
                sketch: req.body.fileContent
            })
            obj.save((err, re)=>{
                if(err) console.log(err)
                else response.json({"message":"ok"})
            })
        })
        
    }

    updateObject = (req: express.Request, res: express.Response)=>{
        let id = req.body.id
        let address = req.body.address
        let rooms = req.body.rooms
        let space = req.body.space
        let object_type = req.body.object_type
        let room = req.body.room
        let door = req.body.door
        ObjectsModule.updateOne({"id":id}, {$set:{"address": address, "rooms":rooms, "space":space, "object_type": object_type,
                "sketch":room}}, (err, r)=>{
            if(err) console.log(err)
            else res.json({"message":"ok"})
        })
    }

    finishRoom = (req: express.Request, response: express.Response) =>{
        let room_number = req.body.room_id
        let obj_id = req.body.object_finishing
        console.log(room_number, obj_id)
        ObjectsModule.updateOne({"id":obj_id, "sketch.room_number":room_number}, {$set:{"sketch.$.status":"finished"}}, (err, r)=>{
            if(err) console.log(err)
            else response.json({"message":"ok"})
        })
    }

    addObject = (req: express.Request, response: express.Response) =>{
        var i =0;
        ObjectsModule.find({}).sort({id: -1}).limit(1).exec((err, r)=>{
            i = r[0].id +1
            let obj = new ObjectsModule({
                id: i,
                client: req.body.client,
                object_type: req.body.object_type,
                address: req.body.address,
                rooms: req.body.rooms,
                space: req.body.space,
                sketch: req.body.rectangles
            })
            obj.save((err, re)=>{
                if(err) console.log(err)
                else response.json({"message":"ok"})
            })
        })
        
    }
}