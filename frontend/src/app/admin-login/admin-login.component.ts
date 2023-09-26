import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
        if(userFromDB!=null){
          if(userFromDB.type=="admin"){
            sessionStorage.setItem("username", userFromDB.username)
            console.log(userFromDB.username)
            this.router.navigate(['administrator']);
          }
          else{
            this.message = "Error: You are not an administrator!"
          }
        }
        else{
          this.message = "Error: Invalid input data!"
        }
    });
  }

}
