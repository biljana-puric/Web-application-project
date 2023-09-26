import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjectsService } from '../objects.service';
import { Job } from '../models/jobs';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Objects } from '../models/objects';
import { Employees } from '../models/employees';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-for-agencies',
  templateUrl: './jobs-for-agencies.component.html',
  styleUrls: ['./jobs-for-agencies.component.css']
})
export class JobsForAgenciesComponent implements OnInit {

  constructor(private objectService: ObjectsService, private userService: UserService, 
    private employeeService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username")
    this.accepted = false
    this.notEnoughEmployees = false
    this.hireAvailableEmployees = false
    this.finish_available = false;
    this.objectService.getAllRequests(this.username).subscribe((data: Job[])=>{
      this.allRequests = data;
      this.ModifiedRequests = data;
      if(data){
        this.ModifiedRequests.forEach(req => {
          this.userService.getMyInfo(req.client).subscribe((usr: User)=>{
            this.allClients.push(usr)
          })
          if(req){
            this.objectService.getMyInfo(req.id).subscribe((obj: Objects[])=>{
              this.allObjects = obj
            })
            console.log(req.id)
            this.allObjects.forEach(element => {
              console.log(element.id)
            });
          }
        });
      }
    })

    this.getAvailableEmployees()
    //active jobs:
    this.objectService.getAllActiveJobs(this.username).subscribe((data: Job[])=>{
      this.ActiveJobs = data;
    })
  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
  }
  @ViewChild('myCanvas') canvasRef: ElementRef;

  private ctx: CanvasRenderingContext2D;
  allObjects: Objects[] = []

  message: string
  accept(ID){
    this.id = ID
    this.accepted = true
  }

  logoutA(){
    sessionStorage.clear()
    this.router.navigate(['/']);
  }

  client: string
  agency: User
  allClients: User[] = []
  markedEmployees: String[]=[]

  markedForHiring(employee){
    this.markedEmployees.push(employee);
  }

  back(){
    this.router.navigate(['agency']);
  }

  hire(){
    if(this.markedEmployees.length<this.objekat.rooms){
      this.message = "You need to hire more employees, one for every room!!!"
      this.notEnoughEmployees=true
      return
    }
    this.employeeService.hire(this.markedEmployees, this.job_hiring, this.objekat.id).subscribe(resp=>{
      if(resp['message']=="ok"){
        alert("employees hired")
        //this.ngOnInit()
      }
      else{
        alert("error")
      }
    })
  }

  sendOffer(){
    this.offerSent = true
    this.objectService.sendOffer(this.offer, this.id).subscribe(res=>{
      if(res['message']=="ok"){
        alert("offer sent")
        this.ngOnInit()
      }
      else{
        alert("error")
      }
    })
  }

  ActiveJobs: Job[] = [];
  offer: string;
  accepted: boolean
  offerSent: boolean
  id: number

  decline(ID){
    this.id = ID
    this.ModifiedRequests = []
    this.allRequests.forEach(job =>{
      if(job.JobID != ID){
        this.ModifiedRequests.push(job);
      }
    })
    this.objectService.declineJob(ID).subscribe(resp=>{
      if(resp['message']=="ok"){
        alert("declined")
      }
      else{
        alert("error")
      }
    })
  }

  username: string;
  allRequests: Job[] = [];
  ModifiedRequests: Job[] = [];
  obj: Objects
  private doors: { x: number, y: number}[] = [];

  allRooms: { x: number, y: number, width: number, height: number, status: String, room_number: Number }[] = []

  availableEmployees: Employees[] = []

  getAvailableEmployees(){
    this.employeeService.getAvailableEmployees(this.username).subscribe((data: Employees[])=>{
      this.availableEmployees = data;
    })
  }

  drawRoom(room: any): void {
    this.ctx.beginPath();
    this.ctx.rect(room.x, room.y, room.width, room.height);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.fillStyle = 'white';
    if(room.status=="in progress"){
      this.ctx.fillStyle = 'red';
    }
    else if (room.status=="finished"){
      this.ctx.fillStyle = 'green'
    }
    else if(room.status=="waiting"){
      this.ctx.fillStyle = 'yellow'
    }
    this.ctx.fill();
    this.ctx.closePath();
  }

  private drawDoor(door: { x: number, y: number }): void {
    this.ctx.fillStyle = 'brown';
    this.ctx.fillRect(door.x - 5, door.y - 5, 30, 20);
  }

  clearCanvas(): void {
    this.allRooms = [];
    this.doors = [];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  notEnoughEmployees: boolean
  hireAvailableEmployees: boolean

  job_hiring: number
  objekat: Objects
  hireEmployees(JobID, obj_id){
    this.job_hiring = JobID
    this.notEnoughEmployees=false
    this.objectService.getMyInfo(obj_id).subscribe((data: Objects)=>{
      this.objekat = data;
      if(this.availableEmployees.length < this.objekat.rooms){
        this.notEnoughEmployees = true;
      }
      else{
        this.hireAvailableEmployees = true;
      }
    })
  }

  finish_available: boolean

  object_finishing: number
  seeSketch(id){
    this.object_finishing = id;
    this.finish_available = true;
    this.clearCanvas();
    this.objectService.getMyInfo(id).subscribe((data: Objects) => {
      this.obj = data;
      this.allRooms = this.obj.sketch.map(room => {
        this.doors = room.door
        return {
          x: room.x,
          y: room.y,
          width: room.width,
          height: room.height,
          status: room.status,
          room_number: room.room_number
        };
      });
    
      for (let i = 0; i < this.allRooms.length; i++) {
        const room = this.allRooms[i];
        this.drawRoom(room)
      }
      for (let i = 0; i < this.doors.length; i++) {
        const door = this.doors[i];
        this.drawDoor(door)
      }
    });
  }

  finishRoom: number

  finish(){
    console.log(this.finishRoom)
    this.objectService.finishRoom(this.finishRoom, this.object_finishing).subscribe((resp)=>{
      if(resp['message']=="ok"){
        alert("room finished")
        this.seeSketch(this.object_finishing);
      }
      else{
        alert("error")
      }
    })
  }

}
