import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAllEmployees(agency){
    const data = {
      agency: agency
    }
    return this.http.post("http://localhost:4000/employees/getAllEmployees", data)
  }

  requestOpeningPositions(agency, number){
    const data = {
      agency:agency,
      number:number
    }
    return this.http.post("http://localhost:4000/employees/requestOpeningPositions", data)
  }

  getAllRequests(){
    return this.http.get("http://localhost:4000/employees/getAllRequests")
  }

  allowPositions(username, number){
    const data={
      username: username,
      number: number
    }
    return this.http.post("http://localhost:4000/employees/allowPositions", data)
  }

  rejectPositions(username){
    const data = {
      username: username
    }
    return this.http.post("http://localhost:4000/employees/rejectPositions", data)
  }

  addEmployee(agency, firstname, lastname, specialization, phone, mail){
    const data={
      agency: agency,
      firstname: firstname,
      lastname: lastname,
      specialization: specialization,
      phone: phone,
      mail: mail
    }
    return this.http.post("http://localhost:4000/employees/addEmployee", data)
  }

  getAllEmployeesAdmin(){
    return this.http.get("http://localhost:4000/employees/getAllEmployeesAdmin")
  }

  deleteEmployee(firstname, agency){
    const data={
      firstname: firstname,
      agency: agency
    }
    return this.http.post("http://localhost:4000/employees/deleteEmployee", data)
  }

  getMyInfo(firstname){
    const data={
      firstname: firstname
    }
    return this.http.post("http://localhost:4000/employees/getMyInfo", data)
  }

  updateEmployee(firstnameForUpdate, firstname, lastname, mail, phone, specialization){
    const data= {
      firstnameForUpdate: firstnameForUpdate,
      firstname: firstname,
      lastname: lastname,
      mail: mail,
      phone: phone,
      specialization: specialization
    }
    return this.http.post("http://localhost:4000/employees/updateEmployee", data)
  }

  getAvailableEmployees(username){
    const data = {
      username: username
    }
    return this.http.post("http://localhost:4000/employees/getAvailableEmployees", data)
  }

  hire(markedEmployees, job_hiring, obj_id){
    const data={
      markedEmployees: markedEmployees,
      job_hiring: job_hiring,
      obj_id: obj_id
    }
    return this.http.post("http://localhost:4000/employees/hire", data)
  }
}
