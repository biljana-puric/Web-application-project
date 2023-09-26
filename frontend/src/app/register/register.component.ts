import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';


const forbiddenUsernames = [];
const forbiddenMails = [];

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isUsernameAvailable = true;
    this.isMailAvailable = true;
    this.passwordDirty = false;
    this.message = ""
  }

  username: string;
  password: string;
  confirmPassword: string;
  type: string;
  phone: string;
  mail: string;
  firstname: string;
  lastname: string;
  isClient: boolean;
  name_of_agency: string;
  country: string;
  city: string;
  street: string;
  postal: string;
  number_of_agency: number;
  description: number;


  show: boolean;
  isUsernameAvailable: boolean;
  message: string;
  passwordDirty: boolean;
  passwordCorrect: boolean;

  myTypeIsClient(){
    this.checkMail()
    this.show = true;
    this.type = "client";
    this.isClient = true;
  }

  myTypeIsAgency(){
    this.checkMail()
    this.show = true;
    this.type = "agency";
    this.isClient = false;
  }

  handleFileInput(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        console.log(width)
        console.log(height)
        if (width >= 100 && height >= 100 && width <= 300 && height <= 300) {
          this.imageValid = true;
        } else {
          alert('Slika mora biti minimalne veličine 100x100 piksela i maksimalne veličine 300x300 piksela.');
        }
        if(this.imageValid) this.image = e.target.result;
      };
      
    };
    reader.readAsDataURL(file);
  }

  imageValid: boolean
  image: Buffer;

  confirmedPassword():boolean{
    this.passwordDirty = true;
    if(this.password==this.confirmPassword) {this.passwordCorrect=true; return true;}
    else {this.passwordCorrect=false; return false;}
  }

  checkUsername(){
    const forbidden = JSON.parse(localStorage.getItem('forbiddenUsernames')) || [];
    if (forbidden.includes(this.username)) {
      this.isUsernameAvailable = false;
      this.message = 'Username is forbidden.';
    } else {
      this.isUsernameAvailable = true;
      this.userService.checkUsername(this.username).subscribe(isAvailable => {
          if(isAvailable == "true")
            this.isUsernameAvailable = true;
          else this.isUsernameAvailable =false;
      });
    }
  }

  isMailAvailable: boolean
  
  checkMail(){
    const forbidden = JSON.parse(localStorage.getItem('forbiddenMails')) || [];
    if (forbidden.includes(this.mail)) {
      this.isMailAvailable = false;
      this.message = 'Mail is forbidden.';
    }
    else{
      this.isMailAvailable = true;
      this.userService.checkMail(this.mail).subscribe(mailAvailable => {
          if(mailAvailable == "false")
            this.isMailAvailable = true;
          else this.isMailAvailable =false;
      });
    }
  }

  checkRegularity():boolean{
    var regular : boolean;
    regular = false;
    var regexMail = new RegExp(/^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/);
    var regexUsername = new RegExp(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/)
    var regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{7,12}$/)
    if(regexUsername.test(this.username) && this.username){
      if(regexPassword.test(this.password)){
          if(this.isMailAvailable){
              if(regexMail.test(this.mail) && this.mail){
                regular = true;
              }
              else{
                regular = false
                this.message = "Format of your mail isn't valid!"
              }
            
          }
          else{
            regular = false
            this.message = "Mail is not available!"
          }
      }
      else{
        regular = false
        this.message = "Password must have at least 7, at most 12 characters, at least one uppercase, one lowercase letter, one digit, and one special character, and it must start with a letter."
      }
    }
    else{
      regular = false
      this.message = "Username is not available!"
    }
    return regular
  }

  checkImageValid(): boolean{
    if (this.image){
      if(this.imageValid){
        return true;
      }
      else{
        return false
      }
    }
    else return true
  }

  register(){
    if(!this.checkRegularity() || !this.isUsernameAvailable || !(this.checkImageValid())){
      alert("Error, please enter valid data")
      return
    }
    if(this.type == "client"){
      this.userService.registerClient(this.username, this.password, this.phone, this.mail, this.firstname, this.lastname, this.image).subscribe(respObj=>{
        if(respObj["message"]=="ok"){
          alert("Your request for registration was successful!")
        }
        else{
          this.message="error"
        }
      })
    }
    else{
      if(this.type == "agency"){
        this.userService.registerAgency(this.username, this.password, this.phone, this.mail, this.name_of_agency, this.country,
          this.city, this.street, this.postal, this.number_of_agency, this.description, this.image).subscribe(respObj=>{
          if(respObj["message"]=="ok"){
            alert("Your request for registration was successful!")
          }
          else{
            this.message="error"
          }
        })
      }
    }
  }
}
