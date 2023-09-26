import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  constructor(private http: HttpClient) { }

  getAllRequests(username){
    const data = {
      username: username
    }
    return this.http.post("http://localhost:4000/jobs/getAllRequests", data)

  }

  getAllActiveJobs(username){
    const data = {
      username: username
    }
    return this.http.post("http://localhost:4000/jobs/getAllActiveJobs", data)

  }

  getAllObjects(client){
    const data = {
      username : client
    }
    return this.http.post("http://localhost:4000/object/getAllObjects", data)
  }

  acceptOffer(id){
    const data = {
      id: id
    }
    return this.http.post("http://localhost:4000/jobs/acceptOffer", data)
  }

  declineOffer(id){
    const data = {
      id: id
    }
    return this.http.post("http://localhost:4000/jobs/declineOffer", data)
  }

  sendOffer(offer, id){
    const data={
      offer: offer,
      id: id
    }
    return this.http.post("http://localhost:4000/jobs/sendOffer", data)
  }

  declineJob(id){
    const data = {
      idJob: id
    }
    return this.http.post("http://localhost:4000/jobs/declineJob", data)
  }

  addJob(agencyName, id, period, client){
    const data={
      agency: agencyName,
      id: id,
      period: period,
      client: client
    }
    return this.http.post("http://localhost:4000/jobs/addJob", data)
  }

  updateComment(agency, username, comment, grade){
    const data ={
      agency: agency,
      username : username,
      comment: comment,
      grade: grade
    }
    return this.http.post("http://localhost:4000/user/updateComment", data)
  }

  leaveComment(username, comment, grade, firstname, lastname, agency){
    const data={
      username: username,
      comment: comment,
      grade: grade,
      firstname: firstname,
      lastname: lastname,
      agency: agency
    }
    return this.http.post("http://localhost:4000/user/leaveComment", data)
  }

  CommentLeft(agency, username){
    const data ={
      agency: agency,
      username : username
    }
    return this.http.post("http://localhost:4000/user/CommentLeft", data)
  }

  getAllJobs(username){
    const data ={
      username : username
    }
    return this.http.post("http://localhost:4000/jobs/getAllJobs", data)
  }

  payForJob(JobID){
    const data={
      JobID: JobID
    }
    return this.http.post("http://localhost:4000/jobs/payForJob", data)
  }

  deleteObject(id){
    const data = {
      object_id: id
    }
    return this.http.post("http://localhost:4000/object/deleteObject", data)
  }

  uploadObject(fileContent, client, object_type, address, rooms, space){
    const data = {
      fileContent : fileContent,
      client: client,
      object_type: object_type,
      address: address,
      rooms: rooms,
      space: space
    }
    return this.http.post("http://localhost:4000/object/uploadObject", data)
  }

  getMyInfo(id){
    const data = {
      id: id
    }
    return this.http.post("http://localhost:4000/object/getMyInfo", data)
  }

  finishRoom(room_id, object_finishing){
    const data={
      room_id: room_id,
      object_finishing: object_finishing
    }
    return this.http.post("http://localhost:4000/object/finishRoom", data)
  }

  getAllCancelling(){
    return this.http.get("http://localhost:4000/jobs/getAllCancelling")
  }

  getAllJobsAdmin(){
    return this.http.get("http://localhost:4000/jobs/getAllJobsAdmin")
  }

  acceptCancelling(JobID){
    const data={
      JobID: JobID
    }
    return this.http.post("http://localhost:4000/jobs/acceptCancelling", data)
  }

  declineCancelling(JobID){
    const data={
      JobID: JobID
    }
    return this.http.post("http://localhost:4000/jobs/declineCancelling", data)
  }

  cancelJob(JobID, reason){
    const data={
      JobID: JobID,
      reason: reason
    }
    return this.http.post("http://localhost:4000/jobs/cancelJob", data)
  }

  updateObject(id, address, rooms, space, object_type, room){
    const data={
      id: id,
      address: address,
      rooms: rooms,
      space: space,
      object_type: object_type,
      room: room
    }
    return this.http.post("http://localhost:4000/object/updateObject", data)
  }

  deleteComment(username, agency){
    const data = {
      username: username,
      agency: agency
    }
    return this.http.post("http://localhost:4000/user/deleteComment", data)
  }

  addObject(client, object_type, address, rooms, space, rectangles){
    const data = {
      client: client,
      object_type: object_type,
      address: address,
      rooms: rooms,
      space: space,
      rectangles: rectangles
    }
    return this.http.post("http://localhost:4000/object/addObject", data)
  }
}
