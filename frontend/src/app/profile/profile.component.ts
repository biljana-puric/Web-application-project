import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.username = sessionStorage.getItem("username");
    this.userService.getMyInfo(this.username).subscribe((resp: User)=>{
      this.user = resp;
      if(this.user.type=="client"){
        this.client = true
      }
      else{
        this.client=false;
      }
    });
  
  }

  back(){
    if(this.client){
      this.router.navigate(['client']);
    }
    else{
      this.router.navigate(['agency']);
    }
    
  }

  username: string;
  user: User
  client: boolean

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])

  }
}
