import express from 'express'
import EmployeeModule from '../models/employees'
import userModule from '../models/user'
import JobModule from '../models/jobs'
import ObjectModule from '../models/objects'

export class EmployeesController{

    getAllEmployees = (req: express.Request, res: express.Response) =>{
        let agency = req.body.agency;
        EmployeeModule.find({"agency":agency}, (err, employees)=>{
            if(err) console.log(err)
            else res.json(employees)
        })
    }

    getAllEmployeesAdmin = (req: express.Request, res: express.Response) =>{
        EmployeeModule.find({}, (err, employee)=>{
            if(err) console.log(err)
            else res.json(employee)
        })
    }

    getMyInfo = (req: express.Request, res: express.Response) =>{
        let firstname = req.body.firstname
        EmployeeModule.findOne({"firstname":firstname}, (err, e)=>{
            if(err) console.log(err)
            else res.json(e);
        })
    }

    updateEmployee = (req: express.Request, res: express.Response) =>{
        let firstnameForUpdate = req.body.firstnameForUpdate
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let mail = req.body.mail
        let phone = req.body.phone
        let specialization = req.body.specialization
        EmployeeModule.updateOne({"firstname":firstnameForUpdate}, {$set:{"firstname": firstname, "lastname": lastname, "mail": mail,
        "phone": phone, "specialization": specialization}}, (err, r)=>{
            if(err) res.json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }

    deleteEmployee = (req: express.Request, res: express.Response) =>{
        let firstname = req.body.firstname;
        let agency = req.body.agency
        EmployeeModule.deleteOne({"firstname":firstname}, (err)=>{
            if(err) res.json({"message":"error"})
            else {
                userModule.updateOne({"username":agency}, {$inc:{"number_of_employees": -1}}, (err)=>{
                    if(err) console.log(err)
                })
                res.json({"message":"ok"})
            }
        })
    }

    hire = (req: express.Request, res: express.Response) =>{
        console.log("preslo na backend")
        let markedEmployees = req.body.markedEmployees
        let job = req.body.job_hiring
        let obj_id = req.body.obj_id
        JobModule.updateOne({"JobID":job}, {$set:{"employees":markedEmployees.length}}, (err, r)=>{
            if(err) console.log(err)
            else{
                let completedUpdates = 0;
                let completed = 0;
                let complete = false
                ObjectModule.findOne({"id":obj_id}, (err, obj)=>{
                    obj.sketch.forEach(room => {
                        ObjectModule.updateOne({"id":obj_id, "sketch.room_number":room.room_number}, 
                                {$set:{"sketch.$.status":"in progress"}}, (err, res)=>{
                            if(err) console.log(err)
                            completed++;
                            if (completed === obj.sketch.length) {
                                complete = true
                            }
                        })
                    });
                    for (let i = 0; i < markedEmployees.length; i++) {
                        EmployeeModule.updateOne({"firstname":markedEmployees[i]}, {$set: {"status": "hired", "job":job}}, (err, r)=>{
                            if(err) console.log(err)
                            completedUpdates++;
                            if (completedUpdates === markedEmployees.length && complete) {
                                res.json({"message": "ok"});
                            }
                        })
                    }
                })
            }
        })
    }

    getAvailableEmployees = (req: express.Request, res: express.Response) =>{
        let agency = req.body.username
        EmployeeModule.find({"agency":agency, "status":"available"}, (err, re)=>{
            if(err) console.log(err)
            else res.json(re)
        })
    }

    requestOpeningPositions = (req: express.Request, res: express.Response) =>{
        let agency = req.body.agency
        let number = req.body.number
        userModule.updateOne({"username":agency}, {$set: {"number_of_opening_positions":number}}, (err, resp)=>{
            if(err) res.json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }

    getAllRequests = (req: express.Request, res: express.Response) =>{
        userModule.find({"number_of_opening_positions": {$gt: 0}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json(resp);
        })
    }

    allowPositions = (req: express.Request, res: express.Response) =>{
        let username = req.body.username
        let number = req.body.number
        userModule.updateOne({"username": username}, {$inc: {"total_number_of_employees": number}, $set: {"number_of_opening_positions": 0}}, (err, resp)=>{
            if(err) res.json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }

    rejectPositions = (req: express.Request, res: express.Response) =>{
        let username= req.body.username
        userModule.updateOne({"username":username}, {$set: {"number_of_opening_positions": 0}}, (err, resp)=>{
            if(err) res.json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }

    addEmployee = (req: express.Request, resp: express.Response) =>{
        let employee = new EmployeeModule({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            mail : req.body.mail,
            specialization : req.body.specialization,
            agency : req.body.agency,
            status: "available"
        })
        employee.save((err, res)=>{
            if(err) console.log(err);
            else {
                userModule.updateOne({"username":req.body.agency}, {$inc:{"number_of_employees":1}}, (err)=>{
                    if(err) console.log(err)
                })
                resp.json({"message": "ok"})
            }
        })
    }
}