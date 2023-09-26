import express from 'express'
import JobModule from '../models/jobs'
import EmployeeModule from '../models/employees'

export class JobController{
    addJob = (req: express.Request, resp: express.Response) =>{
        var id = 0;
        JobModule.find({}).sort({JobID: -1}).limit(1).exec((err, res)=>{
            id = res[0].JobID +1
            console.log(id)
            let job = new JobModule({
                JobID: id,
                agency : req.body.agency,
                id : req.body.id,
                period : req.body.period,
                client: req.body.client,
                status: "requested",
                accepted: "sent",
                employees: 0,
                reason: null
            })
            job.save((err, job)=>{
                if(err) console.log(err)
                else resp.json({"message": "ok"})
            })
        })
        
    }

    acceptCancelling = (req: express.Request, respo: express.Response) =>{
        let id = req.body.JobID;
        JobModule.updateOne({'JobID': id}, {$set: {"status": "cancelled"}}, (err, re)=>{
            if(err) console.log(err)
            else respo.json({"message": "ok"})
        })
    }

    declineCancelling = (req: express.Request, respo: express.Response) =>{
        let id = req.body.JobID;
        JobModule.updateOne({'JobID': id}, {$set: {"reason": null}}, (err, re)=>{
            if(err) console.log(err)
            else respo.json({"message": "ok"})
        })
    }

    getAllCancelling = (req: express.Request, respo: express.Response) =>{
        JobModule.find({"reason": {$not:{$eq: null}}, "status":{$not:{$eq:"cancelled"}}}, (err, jobs)=>{
            if(err) console.log(err)
            else respo.json(jobs)
        })
    }

    cancelJob = (req: express.Request, respo: express.Response) =>{
        let id = req.body.JobID;
        let reason = req.body.reason
        JobModule.updateOne({'JobID': id}, {$set: {"reason": reason}}, (err, re)=>{
            if(err) console.log(err)
            else respo.json({"message": "ok"})
        })
    }

    payForJob = (req: express.Request, respo: express.Response) =>{
        let id = req.body.JobID;
        let empl = 0;
        JobModule.findOne({'JobID':id}, (err, j)=>{
            if(j) {
                empl = j.employees
                JobModule.updateOne({'JobID': id}, {$set: {"status" : "finished", "employees" : 0}}, (err)=>{
                    if(err) respo.json({"message": "error"});
                    else {
                        let updates = 0
                        EmployeeModule.updateMany({"job":id}, {$set:{"job": null, "status":"available"}}, (err, re)=>{
                            if(err) respo.json({"message": "error"});
                            else updates++; 
                            if(updates==empl) respo.json({"message": "ok"});
                        })
                    }
                })
            }
        })
        
        
    }

    declineJob = (req: express.Request, respo: express.Response) =>{
        let id = req.body.idJob;
        JobModule.updateOne({'JobID': id}, {$set: {"accepted" : "declined"}}, (err)=>{
            if(err) respo.json({"message": "error"});
            else respo.json({"message": "ok"});
        })
    }

    getAllJobs = (req: express.Request, respon: express.Response) =>{
        let username = req.body.username
        JobModule.find({"client": username}, (err, jobs)=>{
            if(err) console.log(err)
            else respon.json(jobs)
        })
    }

    getAllRequests = (req: express.Request, resp: express.Response) => {
        let username = req.body.username;
        JobModule.find({$or: [{"agency": username, "status": "requested", "accepted": "accepted"}, 
                {"agency": username, "status": "requested", "accepted": "sent"}]}, (err, jobsFound)=>{
            if(err) console.log(err)
            else resp.json(jobsFound);
        })
    }

    sendOffer = (req: express.Request, respons: express.Response) =>{
        let offer = req.body.offer
        let id = req.body.id
        JobModule.updateOne({'JobID': id}, {$set: {"accepted" : "accepted", "offer": offer}}, (err)=>{
            if(err) respons.json({"message": "error"});
            else respons.json({"message": "ok"});
        })
    }

    acceptOffer = (req: express.Request, response0: express.Response) =>{
        let id = req.body.id
        JobModule.updateOne({'JobID': id}, {$set: {"status" : "active"}}, (err)=>{
            if(err) response0.json({"message": "error"});
            else response0.json({"message": "ok"});
        })
    }

    declineOffer = (req: express.Request, response1: express.Response) =>{
        let id = req.body.id
        JobModule.deleteOne({"JobID":id}, (err)=>{
            if(err) response1.json({"message": "error"});
            else response1.json({"message": "ok"});
        })
    }

    getAllJobsAdmin = (req: express.Request, response4: express.Response) =>{
        JobModule.find({}, (err, allJob)=>{
            if(err) console.log(err)
            else response4.json(allJob)
        })
    }

    getAllActiveJobs = (req: express.Request, response2: express.Response) =>{
        let username = req.body.username
        JobModule.find({"agency": username, "status":"active"}, (err, jobFound)=>{
            if(err) console.log(err)
            else response2.json(jobFound)
        })
    }
}
