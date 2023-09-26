import { Component, OnInit } from '@angular/core';
import { Employees } from '../models/employees';
import { EmployeesService } from '../employees.service';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeesService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.agency = sessionStorage.getItem("username");
    this.updateAllowed = false;
    console.log(this.agency);
    this.userService.getMyInfo(this.agency).subscribe((data: User)=>{
      this.agencyUser = data;
    })
    this.employeeService.getAllEmployees(this.agency).subscribe((data: Employees[])=>{
      this.allEmployees = data;
      this.left_free_positions = this.agencyUser.total_number_of_employees - this.allEmployees.length;
      if(data.length==0){
        this.noEmployees = true;
      }
      else{
        this.noEmployees = false;
      }
    })
  }

  deleteEmployee(firstname){
    this.employeeService.deleteEmployee(firstname, this.agency).subscribe(res=>{
      if(res["message"]=="ok"){
        alert("Employee deleted!")
        this.ngOnInit()
      }
      else{
        alert("error");
      }
    })
  }

  firstnameForUpdate: string;
  updateAllowed: boolean;

  allowUpdate(firstname){
    this.firstnameForUpdate = firstname;
    this.updateAllowed = true;
    this.employeeService.getMyInfo(firstname).subscribe((data: Employees)=>{
      this.employeeForUpdate = data;
    })
  }

  back(){
    this.router.navigate(['agency']);
  }
  employeeForUpdate: Employees;

  updateEmployee(){
    this.employeeService.updateEmployee(this.firstnameForUpdate, this.employeeForUpdate.firstname, this.employeeForUpdate.lastname, this.employeeForUpdate.mail, this.employeeForUpdate.phone, this.employeeForUpdate.specialization).subscribe(res=>{
      if(res["message"]=="ok"){
        alert("Employee updated!")
        this.ngOnInit()
      }
      else{
        alert("error");
      }
    })
  }

  logoutA(){
    sessionStorage.clear()
    this.router.navigate(['/']);
  }
  agencyUser: User

  openPositions(){
    this.employeeService.requestOpeningPositions(this.agency, this.number_of_positions).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("request sent")
      }
      else{
        alert("error")
      }
    })
  }

  left_free_positions: number;
  number_of_positions : number;
  noEmployees: boolean;
  agency: string;
  allEmployees: Employees[] = [];

}
