import express from 'express'
import commentModule from '../models/comments'

export class CommentController{
    getAllComments = (req: express.Request, r: express.Response)=>{
        let agencyId = req.body.agency;
        commentModule.find({"agency":agencyId}, (err, comment)=>{
            if(err) console.log(err)
            else r.json(comment)
        })

    }

    CommentLeft = (req: express.Request, res: express.Response)=>{
        let agency = req.body.agency
        let client = req.body.username
        commentModule.findOne({"agency": agency, "username": client}, (err, comm)=>{
            if(err) console.log(err)
            else res.json(comm)
        })
    }

    deleteComment = (req: express.Request, respon: express.Response)=>{
        let agency = req.body.agency
        let username = req.body.username
        commentModule.deleteOne({"agency":agency, "username":username}, (err, r)=>{
            if(err) console.log(err)
            else respon.json({"message":"ok"})
        })
    }

    updateComment = (req: express.Request, resp: express.Response)=>{
        let agency = req.body.agency
        let client = req.body.username
        let comment = req.body.comment
        let grade = req.body.grade
        commentModule.updateOne({"username":client, "agency":agency}, {$set: {"comment":comment, "grade":grade}}, (err, re)=>{
            if(err) console.log(err)
            else resp.json({"message":"ok"})
        })
    }

    leaveComment = (req: express.Request, respo: express.Response)=>{
        let comm = new commentModule({
            username : req.body.username,
            comment: req.body.comment,
            grade: req.body.grade,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            agency: req.body.agency
        })
        comm.save((err, r)=>{
            if(err) console.log(err)
            else respo.json({"message":"ok"})
        })
    }
}