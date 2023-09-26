import { Component, OnInit } from '@angular/core';
import { ObjectsService } from '../objects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requesting-job',
  templateUrl: './requesting-job.component.html',
  styleUrls: ['./requesting-job.component.css']
})
export class RequestingJobComponent implements OnInit {

  constructor(private objectService: ObjectsService, private router: Router) { }

  ngOnInit(): void {
    this.agencyName = sessionStorage.getItem("RequestedAgency");
    this.client = sessionStorage.getItem("username");
  }

  agencyName : string;
  id: number;
  period: string;
  message: string;
  client: string;

  request(){
    this.objectService.addJob(this.agencyName, this.id, this.period, this.client).subscribe(responseObject=>{
      if(responseObject["message"] == "ok"){
        alert("Job added!")
        this.router.navigate(['agenciesMenu'])
      }
      else{
        this.message = "Error"
      }
    });
  }

  logoutA(){
    sessionStorage.clear()
    this.router.navigate(['/']);
  }

  
  back(){
    this.router.navigate(['agenciesMenu']);
  }
}
