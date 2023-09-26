import { Component, OnInit } from '@angular/core';
import { Comments } from '../models/comments';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency-web',
  templateUrl: './agency-web.component.html',
  styleUrls: ['./agency-web.component.css']
})
export class AgencyWebComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("username")!=null){
      this.registered = true;
    }
    else{
      this.registered = false
    }
    this.agency = sessionStorage.getItem("agency");
    this.name_of_agency = sessionStorage.getItem("AgencyName");
    this.userService.getAllComments(this.agency).subscribe((data: Comments[])=>{
      this.agencyComments = data;
    })
  }

  back(){
    if(this.registered) this.router.navigate(['agenciesMenu']);
    else this.router.navigate([''])
  }
  logoutA(){
    sessionStorage.clear()
    this.router.navigate(['/']);
  }
  agencyComments: Comments[] = [];
  agency: string;
  name_of_agency: string;
  registered: boolean;

}
