import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear()
    this.searching=false
    this.search = false
    this.logEnabled = false
    this.userService.getAllAgencies().subscribe((data: User[])=>{
      this.allAgencies = data;
    })

  }

  logEnable(){
    this.logEnabled = true
    this.search = false
  }

  logEnabled: boolean

  searchEnable(){
    this.search = true;
    this.logEnabled = false
  }

  search: boolean
  username: string;
  password: string;
  message: string;

  allAgencies : User[] = [];

  call_agency(agency, name_of_agency){
    sessionStorage.setItem("agency", agency);
    sessionStorage.setItem("AgencyName", name_of_agency);
    this.router.navigate(['agencyWeb']);
  }

  searchParamName: string;
  searchParamAddress: string;
  searchedAgency: User[] = [];
  searching: boolean;

  searchAgency(){
    this.searching = true;
    if(this.searchParamAddress == null){
      this.userService.searchAgencyByName(this.searchParamName).subscribe((searchedAgency: User[])=>{
        this.searchedAgency = searchedAgency;
      })
    }
    else if(this.searchParamName == null){
      this.userService.searchAgencyByAddress(this.searchParamAddress).subscribe((searchedAgency: User[])=>{
        this.searchedAgency = searchedAgency;
      })
    }
    else{
      this.userService.searchAgencyBoth(this.searchParamName, this.searchParamAddress).subscribe((searchedAgency: User[])=>{
        this.searchedAgency = searchedAgency;
      })
    }
  }

  sortAgenciesAsc(){
    this.searchedAgency.sort((ag1, ag2)=>{
      if(ag1.street<ag2.street){
        return -1;
      }
      else{
        if(ag1.street == ag2.street){
          return 0;
        }
        else return 1;
      }
    })
    this.searchedAgency.sort((ag1, ag2)=>{
      if(ag1.city<ag2.city){
        return -1;
      }
      else{
        if(ag1.city == ag2.city){
          return 0;
        }
        else return 1;
      }
    })
    this.searchedAgency.sort((ag1, ag2)=>{
      if(ag1.country<ag2.country){
        return -1;
      }
      else{
        if(ag1.country == ag2.country){
          return 0;
        }
        else return 1;
      }
    })
    this.searchedAgency.sort((ag1, ag2)=>{
      if(ag1.name_of_agency<ag2.name_of_agency){
        return -1;
      }
      else{
        if(ag1.name_of_agency == ag2.name_of_agency){
          return 0;
        }
        else return 1;
      }
    })
    
  }

  sortAgenciesDesc(){
    this.searchedAgency.sort((ag2, ag1)=>{
      if(ag1.street<ag2.street){
        return -1;
      }
      else{
        if(ag1.city == ag2.city){
          return 0;
        }
        else return 1;
      }
    })
    this.searchedAgency.sort((ag2, ag1)=>{
      if(ag1.city<ag2.city){
        return -1;
      }
      else{
        if(ag1.city == ag2.city){
          return 0;
        }
        else return 1;
      }
    })
    this.searchedAgency.sort((ag2, ag1)=>{
      if(ag1.country<ag2.country){
        return -1;
      }
      else{
        if(ag1.city == ag2.city){
          return 0;
        }
        else return 1;
      }
    })
    this.searchedAgency.sort((ag2, ag1)=>{
      if(ag1.name_of_agency<ag2.name_of_agency){
        return -1;
      }
      else{
        if(ag1.name_of_agency == ag2.name_of_agency){
          return 0;
        }
        else return 1;
      }
    })
    
  }

  login(){
    sessionStorage.clear();
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
        if(userFromDB!=null){
          if(userFromDB.type=="client"){
            sessionStorage.setItem("username", this.username)
            sessionStorage.setItem("password", this.password)
            sessionStorage.setItem("firstname", userFromDB.firstname)
            sessionStorage.setItem("lastname", userFromDB.lastname)
            sessionStorage.setItem("mail", userFromDB.mail)
            sessionStorage.setItem("phone", userFromDB.phone)
            this.router.navigate(['client']);
          }
          else{
            if(userFromDB.type=="agency"){
              sessionStorage.setItem("username", this.username)
              sessionStorage.setItem("password", this.password)
              sessionStorage.setItem("name_of_agency", (String)(userFromDB.name_of_agency))
              sessionStorage.setItem("country", (String)(userFromDB.country))
              sessionStorage.setItem("city", (String)(userFromDB.city))
              sessionStorage.setItem("street", (String)(userFromDB.street))
              sessionStorage.setItem("description", (String)(userFromDB.description))
              sessionStorage.setItem("mail", (String)(userFromDB.mail))
              sessionStorage.setItem("phone", (String)(userFromDB.phone))
              this.router.navigate(['agency']);
            }
          }
        }
        else{
          this.message = "Error: Invalid input data!"
        }
    });
  }

}
