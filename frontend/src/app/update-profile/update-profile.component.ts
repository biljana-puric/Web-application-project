import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    this.firstname = sessionStorage.getItem("firstname");
    this.updating = sessionStorage.getItem("updating")
    if(!this.updating) {
      this.updating = this.username
      this.admin = false
    }
    else{
      this.admin = true
    }
    this.userService.getMyInfo(this.updating).subscribe((res: User)=>{
      this.user = res;
      if(this.user.type == "client"){
        this.client = true;
      }
      else this.client = false;
    })
  }

  updating: string;
  admin:boolean
  client: boolean;
  user: User
  isMailAvailable: boolean;
  checkMail(){
    this.isMailAvailable = true;
    this.userService.checkMail(this.mail).subscribe(mailAvailable => {
        if(mailAvailable == "true")
          this.isMailAvailable = true;
        else this.isMailAvailable =false;
    });
  }

  back(){
    if(this.admin) this.router.navigate(['administrator'])
    else this.router.navigate(['profile']);
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])

  }

  updateProfileClient(){
    this.userService.updateProfileClient(this.user.username, this.user.firstname, this.user.lastname, this.user.phone, this.user.mail).subscribe(respObj=>{
      if(respObj['message']=="ok"){
        alert("Updated successfully")
        this.back()
      }
      else{
        alert("Error")
      }
    })
  }

  updateProfileAgency(){
    this.userService.updateProfileAgency(this.user.username, this.user.firstname, this.user.lastname, this.user.country, this.user.city, this.user.street, 
      this.user.description, this.user.mail, this.user.phone).subscribe(respObj=>{
      if(respObj['message']=="ok"){
        alert("Updated successfully")
        this.back()
      }
      else{
        alert("Error")
      }
    })
  }

  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  mail: string;
  country: string;
  city: string;
  street: string;
  descritpion: string;
}
