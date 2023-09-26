import express from 'express'
import userModule from '../models/user'
import { readFileSync } from 'fs';

export class UserController{

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        userModule.findOne({"username": username, "password": password}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })

    }

    getAllAgencies = (req: express.Request, respo: express.Response)=>{
        userModule.find({"type":"agency", "status":"registered"}, (err, agency)=>{
            if(err) console.log(err)
            else respo.json(agency)
        })
    }

    changePassword = (req: express.Request, respon: express.Response)=>{
        let username = req.body.username;
        let newPassword = req.body.password;
        userModule.findOne({"username": username}, (err, userFound)=>{
            if(err) respon.json({"message": "error"});
            else {
                if(userFound){
                    userModule.updateOne({'username': username}, {$set: {"password" : newPassword}}, (err)=>{
                        if(err) respon.json({"message": "error"});
                        else respon.json({"message": "ok"});
                    })
                }
            }
        })

    }

    checkUsername = (req: express.Request, response: express.Response)=>{
        let username = req.body.username;
        userModule.findOne({"username": username}, (err, userExists)=>{
            if(err) response.json("true")
            if(userExists!=null) response.json("false")
        })
    }

    checkMail = (req: express.Request, response5: express.Response)=>{
        let mail = req.body.mail;
        userModule.findOne({"mail": mail}, (err, mailExists)=>{
            if(err) response5.json("error")
            if(mailExists) response5.json("true")
            else response5.json("false")
        })
    }

    searchAgencyByName = (req: express.Request, re: express.Response)=>{
        let searchParamName = req.body.searchParamName;
        userModule.find({'name_of_agency': {$regex : searchParamName}}, (err, agencyFound)=>{
            if(err) console.log(err)
            else re.json(agencyFound)
        })
    }

    searchAgencyByAddress = (req: express.Request, response0: express.Response)=>{
        let searchParamAddress = req.body.searchParamAddress;
        userModule.find({$or: [{'country': {$regex : searchParamAddress}}, 
            {'city': {$regex : searchParamAddress}}, {'street': {$regex : searchParamAddress}}]}, (err, agenciesFound)=>{
            if(err) console.log(err)
            else {
                response0.json(agenciesFound)
                
            }
        })

    }

    deleteUser = (req: express.Request, response3: express.Response)=>{
        let username = req.body.username
        console.log(username);
        userModule.deleteOne({"username":username}, (err)=>{
            if(err) console.log(err)
            else response3.json({"message":"ok"})
        })
    }

    updateProfileClient = (req: express.Request, response6: express.Response)=>{
        let username = req.body.username
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let phone = req.body.phone
        let mail = req.body.mail
        userModule.updateOne({"username": username},{$set: {"firstname":firstname, "lastname":lastname, "phone":phone, "mail":mail}}, (err, resp) => {
            if(err)console.error(err);
            else response6.json({"message":"ok"})
        })
    }

    updateProfileAgency = (req: express.Request, response7: express.Response)=>{
        let username = req.body.username
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let phone = req.body.phone
        let country = req.body.country
        let city = req.body.city
        let street = req.body.street
        let description = req.body.description
        let mail = req.body.mail
        userModule.updateOne({"username": username},{$set: {"firstname":firstname, "lastname":lastname, "phone":phone, "mail":mail, 
        "country":country, "city":city, "street":street, "description":description}}, (err, resp) => {
            if(err)console.error(err);
            else response7.json({"message":"ok"})
        })
    }

    getAllUsers = (req: express.Request, response2: express.Response)=>{
        userModule.find({"status" :"registered"}, (err, allUsers)=>{
            if(err) console.log(err)
            else response2.json(allUsers)
        })
    }

    searchAgencyBoth = (req: express.Request, response1: express.Response)=>{
        let searchParamName = req.body.searchParamName;
        let searchParamAddress = req.body.searchParamAddress;
        userModule.find({$or: [{'country': {$regex : searchParamAddress}}, 
            {'city': {$regex : searchParamAddress}}, {'street': {$regex : searchParamAddress}}, 
            {'name_of_agency': {$regex : searchParamName}}]}, (err, agenciesFound)=>{
            if(err) console.log(err)
            else response1.json(agenciesFound)
        })
    }

    getMyInfo = (req: express.Request, responded: express.Response)=>{
        let username = req.body.username
        userModule.findOne({"username":username}, (err, userF)=>{
            if(err) console.log(err)
            else responded.json(userF)
        })
    }

    acceptReg = (req: express.Request, response10: express.Response)=>{
        let username = req.body.username
        userModule.updateOne({"username":username}, {$set: {"status":"registered"}}, (err, re)=>{
            if(err) console.log(err)
            else response10.json({"message":"ok"})
        })
    }

    declineReg = (req: express.Request, response11: express.Response)=>{
        let username = req.body.username
        userModule.deleteOne({"username":username}, (err, re)=>{
            if(err) console.log(err)
            else response11.json({"message":"ok"})
        })
    }

    getAllRequestsForReg = (req: express.Request, responding: express.Response)=>{
        userModule.find({"status":"requested"}, (err, Req)=>{
            if(err) console.log(err)
            else responding.json(Req)
        })
    }

    register = (req: express.Request, resp: express.Response)=>{
        let image = req.body.image
        if(image) image.toString("base64")
        // if(!image){
        //     image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjZjYTBkY2U2LWE4ODAtNDQzNy1hNDEyLTUzMWVjM2E1ODEyZTwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjIxMWI3NDAzLWE1NWYtNGY4OS1iODEwLTM0YmFmODBmYTVmOTwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/8AACwgBaAFoAQERAP/EABwAAQADAQEBAQEAAAAAAAAAAAAEBgcFAgMBCP/EAD8QAQABAwECCQkFCAIDAAAAAAABAgMEBQYRBxIWITFBVZTRE1FhcXKBkaHBFSIjQrIUMjM2UmKisWPCF5KT/9oACAEBAAA/ALwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
        // }
        let type = req.body.type;
        if(type == "client"){
            let user = new userModule({
                username : req.body.username,
                password : req.body.password,
                phone : req.body.phone,
                type: "client",
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                mail : req.body.mail,
                image: image,
                status: "requested"
            })
            user.save((err, res)=>{
                if(err) console.log(err);
                else resp.json({"message": "ok"})
            })
        }
        else{
            let agency = new userModule({
                username : req.body.username,
                password : req.body.password,
                phone : req.body.phone,
                type: "agency",
                mail : req.body.mail,
                name_of_agency : req.body.name_of_agency,
                country : req.body.country,
                city : req.body.city,
                street : req.body.street,
                postal: req.body.postal,
                number_of_agency: req.body.number_of_agency,
                description : req.body.description,
                image: image,
                number_of_employees :0,
                total_number_of_employees: 0,
                number_of_opening_positions: 0,
                status: "requested"
            })
            agency.save((err, res)=>{
                if(err) console.log(err);
                else resp.json({"message": "ok"})
            })
        }
    }
}