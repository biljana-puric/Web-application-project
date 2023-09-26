import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logoutA(){
    sessionStorage.clear()
    this.router.navigate(['/']);
  }
}
