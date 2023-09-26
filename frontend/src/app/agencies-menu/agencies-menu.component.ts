import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencies-menu',
  templateUrl: './agencies-menu.component.html',
  styleUrls: ['./agencies-menu.component.css']
})
export class AgenciesMenuComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.searching=false
    this.searchMe = false
    this.userService.getAllAgencies().subscribe((data: User[])=>{
      this.allAgencies = data;
    })
  }
  back(){
    this.router.navigate(['client']);
  }
  requestJob(AgencyUsername){
    sessionStorage.setItem("RequestedAgency" , AgencyUsername);
    this.router.navigate(['requestingJob']);
  }

  search(){
    this.searchMe = true
  }

  searchMe: boolean
  searchParamName: string;
  searchParamAddress: string;
  searchedAgency: User[] = [];
  searching: boolean;

  call_agency(agency, name_of_agency){
    sessionStorage.setItem("agency", agency);
    sessionStorage.setItem("AgencyName", name_of_agency);
    this.router.navigate(['agencyWeb']);
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])

  }

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
    // this.searchedAgency.sort((ag1, ag2)=>{
    //   if(ag1.city<ag2.city){
    //     return -1;
    //   }
    //   else{
    //     if(ag1.city == ag2.city){
    //       return 0;
    //     }
    //     else return 1;
    //   }
    // })
  }

  sortAgenciesDesc(){
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
    // this.searchedAgency.sort((ag2, ag1)=>{
    //   if(ag1.city<ag2.city){
    //     return -1;
    //   }
    //   else{
    //     if(ag1.city == ag2.city){
    //       return 0;
    //     }
    //     else return 1;
    //   }
    // })
  }

  allAgencies: User[] = [];

}
