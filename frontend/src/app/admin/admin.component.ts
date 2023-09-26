import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { ObjectsService } from '../objects.service';
import { Job } from '../models/jobs';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { Employees } from '../models/employees';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private objectService: ObjectsService, private router: Router, private EmployeeService: EmployeesService) { }

  ngOnInit(): void {
    this.userService.getMyInfo((data:User)=>{
      this.myinfo=data
      if(data.type=="client"){
        this.client=true
      }
      else{
        this.client=false
      }
    })
    this.seeNewRequests = false;
    this.getAllUsers();
    this.RequestedCancelling = false
    this.updateAllowed = false;
    this.objectService.getAllJobsAdmin().subscribe((data: Job[])=>{
      this.allJobs = data;
    })
    this.getAllEmployees()
  }

  newRequestForPositions: User[] = []
  seeNewRequestsForOpeningPositions: boolean
  allUsers: User[] = []
  seeNewRequests: boolean
  noEmployees: boolean;
  allEmployees: Employees[] = [];
  newRequest: User[] = []
  allJobs: Job[] = [];
  firstnameForUpdate: string;
  updateAllowed: boolean;
  employeeForUpdate: Employees;
  myinfo: User
  client: boolean

  getAllEmployees(){
    this.EmployeeService.getAllEmployeesAdmin().subscribe((data: Employees[])=>{
      this.allEmployees = data;
      if(this.allEmployees.length == 0 ){
        this.noEmployees = true;
      }
      else{
        this.noEmployees = false;
      }
    })
  }
  acceptReg(username){
    this.userService.acceptReg(username).subscribe(res=>{
      if(res["message"]=="ok"){
        alert("ok")
        this.ngOnInit()
      }
      else{
        alert("error")
      }
    })
  }
  declineReg(username){
    const forbidden = JSON.parse(localStorage.getItem('forbiddenUsernames')) || [];
    forbidden.push(username);
    localStorage.setItem('forbiddenUsernames', JSON.stringify(forbidden));
    this.userService.declineReg(username).subscribe(re=>{
      if(re["message"]=="ok"){
        alert("declined")
        this.ngOnInit()
      }
      else{
        alert("error")
      }
    })
  }
  newRequests(){
    this.seeNewRequests = true;
    this.userService.getAllRequestsForReg().subscribe((data: User[])=>{
      this.newRequest = data;
    })
  } 
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data: User[])=>{
      this.allUsers = data;
    })
  }
  deleteUser(username){
    this.userService.deleteUser(username).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("User deleted")
        this.getAllUsers()
      }
      else{
        alert("error");
      }
    })
  }
  allowUpdate(firstname){
    this.firstnameForUpdate = firstname;
    this.updateAllowed = true;
    this.EmployeeService.getMyInfo(firstname).subscribe((data: Employees)=>{
      this.employeeForUpdate = data;
    })
  }
  updateEmployee(){
    this.EmployeeService.updateEmployee(this.firstnameForUpdate, this.employeeForUpdate.firstname, this.employeeForUpdate.lastname, this.employeeForUpdate.mail, this.employeeForUpdate.phone, this.employeeForUpdate.specialization).subscribe(res=>{
      if(res["message"]=="ok"){
        alert("Employee updated!")
        this.ngOnInit()
      }
      else{
        alert("error");
      }
    })
  }
  newRequestsForOpeningPositions(){
    this.seeNewRequestsForOpeningPositions = true;
    this.EmployeeService.getAllRequests().subscribe((data: User[])=>{
      this.newRequestForPositions = data;
    })
  }
  deleteEmployee(firstname, agency){
    this.EmployeeService.deleteEmployee(firstname, agency).subscribe(res=>{
      if(res["message"]=="ok"){
        alert("Employee deleted!")
        this.getAllEmployees()
      }
      else{
        alert("error");
      }
    })
  }

  allowPositions(username, number){
    this.EmployeeService.allowPositions(username, number).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Positions opened!")
        this.newRequestsForOpeningPositions()
      }
      else{
        alert("error");
      }
    })
  }

  rejectPositions(username){
    this.EmployeeService.rejectPositions(username).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Positions opening rejected!")
        this.newRequestsForOpeningPositions()
      }
      else{
        alert("error");
      }
    })
  }

  cancellingReqs: Job[]=[]
  cancellingRequests(){
    this.RequestedCancelling = true;
    this.objectService.getAllCancelling().subscribe((data: Job[])=>{
      this.cancellingReqs = data;
    })
  }

  acceptCancelling(JobID){
    this.objectService.acceptCancelling(JobID).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Job cancelled!")
        this.cancellingRequests()
      }
      else{
        alert("error");
      }
    })
  }

  update(username){
    sessionStorage.setItem("updating", username)
  }

  declineCancelling(JobID){
    this.objectService.declineCancelling(JobID).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Job cancelling declined!")
        this.cancellingRequests()
      }
      else{
        alert("error");
      }
    })
  }

  RequestedCancelling: boolean

  logoutA(){
    sessionStorage.clear()
    this.router.navigate(['admin']);
  }
  
}
