import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    this.checkOldPassword = sessionStorage.getItem("password");
  }

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordDirty: boolean;
  passwordCorrect: boolean;
  username: string;
  checkOldPassword: string;
  message: string;

  confirmedPassword():boolean{
    this.passwordDirty = true;
    if(this.newPassword==this.confirmPassword) {this.passwordCorrect=true; return true;}
    else {this.passwordCorrect=false; return false;}
  }

  checkPassword():boolean{
    var regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{7,12}$/)
    if(regexPassword.test(this.newPassword) && this.newPassword) return true;
    else return false;
  }

  changePassword(){
    if(this.checkPassword()){
      if(this.checkOldPassword==this.oldPassword){
        this.userService.changePassword(this.username, this.newPassword).subscribe(respOb=>{
          if(respOb['message']=="ok"){
            alert("Your password is changed successfully! ")
            sessionStorage.clear();
            this.router.navigate(['']);
          }
          else{
            this.message = "There was an error with changing your password! "
          }
        })
      }
      else{
        this.message = "Your password isn't correct!"
      }
    }
    else this.message = "Invalid password format! "
  }
}
