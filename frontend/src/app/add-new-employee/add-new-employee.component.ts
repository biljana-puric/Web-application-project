import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeesService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.agency = sessionStorage.getItem("username");
    console.log(this.agency)
    this.userService.getMyInfo(this.agency).subscribe((user: User)=>{
      this.user = user;
      console.log(user)
      if(this.user.type=="admin") this.admin = true
    })
  }

  admin: boolean
  firstname: string;
  lastname: string;
  specialization: string;
  phone: string;
  mail: string;
  agency: string;
  number_of_e: string

  user: User

  addEmployee(){
    this.employeeService.addEmployee(this.agency, this.firstname, this.lastname, this.specialization, this.phone, this.mail).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("added!")
        this.back()
      }
      else{
        alert("error")
      }
    })
  }

  back(){
    if(this.user.type =="admin") this.router.navigate(['administrator']);
    else this.router.navigate(['employees']);
  }
}
