import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjectsService } from '../objects.service';
import { Job } from '../models/jobs';
import { Router } from '@angular/router';
import { Comments } from '../models/comments';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Objects } from '../models/objects';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private objectService: ObjectsService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.firstname = sessionStorage.getItem("firstname");
    this.lastname = sessionStorage.getItem("lastname");
    this.username = sessionStorage.getItem("username");
    this.enablePaying = false;
    this.cancelling = false;
    this.requestedJob = false;
    this.CommentEnable = false;
    this.LeaveComment = false;
    this.accepted = false;
    this.activeJob = false;
    this.commentExists = false;
    this.declined = false;
    this.objectService.getAllJobs(this.username).subscribe((data: Job[])=>{
      this.allJobs = data;
      this.filteredJobs = data;
    })
  }
  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
  }
  @ViewChild('myCanvas') canvasRef: ElementRef;
  private ctx: CanvasRenderingContext2D;

  firstname: string;
  lastname: string;

  CommentEnable: boolean;
  LeaveComment: boolean;

  comment: string;
  grade: number;

  deleteComment(){
    this.objectService.deleteComment(this.username, this.agency).subscribe(re=>{
      if(re["message"]=="ok"){
        alert("deleted")
        this.router.navigate(['jobs'])
      }
      else{
        alert("error");
      }
    })
  }

  leaveComment(agency){
    this.LeaveComment = true;
    this.CommentEnable = false;
    this.agency = agency;
    this.userService.getMyInfo(this.agency).subscribe((data: User)=>{
      this.agencyObj = data;
    })
    this.objectService.CommentLeft(this.agency, this.username).subscribe((comm: Comments)=>{
      this.commentLeft = comm;
      if(comm){
        this.commentExists = true;
      }
      else{
        this.commentExists = false;
      }
    })
    this.userService.getMyInfo(this.username).subscribe((data: User)=>{
      this.user = data;
    })
  }

  user: User;
  agencyObj: User;
  commentExists: boolean

  leaveComm(){
    if(this.commentLeft){
      this.objectService.updateComment(this.commentLeft.agency, this.commentLeft.username, this.commentLeft.comment, this.commentLeft.grade).subscribe(resp=>{
        if(resp["message"]=="ok"){
          alert("ok")
        }
        else{
          alert("error")
        }
      })
    }
    else{
      this.objectService.leaveComment(this.username, this.comment, this.grade, this.user.firstname, this.user.lastname, this.agency).subscribe(re=>{
        if(re["message"]=="ok"){
          alert("ok")
        }
        else{
          alert("error")
        }
      });
    }
  }

  commentLeft: Comments
  agency: string;

  filter(){
    this.clearCanvas()
    this.filteredJobs = [];
  
    this.allJobs.forEach(job =>{
      if(job.status == this.selectedJob){
        this.filteredJobs.push(job);
      }
    })
    if(this.selectedJob == "finished"){
      this.CommentEnable = true;
      this.requestedJob = false;
      this.activeJob = false;
      this.cancelling = false
    }
    if(this.selectedJob == "requested"){
      this.requestedJob = true;
      this.CommentEnable = false;
      this.activeJob = false;
      this.cancelling = false
    }
    if(this.selectedJob=="active"){
      this.CommentEnable = false;
      this.requestedJob = false;
      this.activeJob = true;
    }
  }

  obj: Objects
  private doors: { x: number, y: number}[] = [];

  allRooms: { x: number, y: number, width: number, height: number, status: String }[] = []

  seeImprovement(id, JobID){
    this.clearCanvas();
    this.job_sketching = JobID
    this.objectService.getMyInfo(id).subscribe((data: Objects) => {
      this.obj = data;
      this.allRooms = this.obj.sketch.map(room => {
        this.doors = room.door
        return {
          x: room.x,
          y: room.y,
          width: room.width,
          height: room.height,
          status: room.status
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


  cnt = 0
  drawRoom(room: any): void {
    this.ctx.beginPath();
    this.ctx.rect(room.x, room.y, room.width, room.height);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.fillStyle = 'white'

    if(room.status=="in progress"){
      this.ctx.fillStyle = 'red';
    }
    else if (room.status=="finished"){
      this.ctx.fillStyle = 'green'
      this.cnt++
    }
    this.ctx.fill();
    this.ctx.closePath();
    console.log(this.cnt, this.obj.sketch.length)
    if(this.cnt==this.obj.sketch.length){
      this.enablePaying = true;
      this.job_for_paying = this.job_sketching
    }
  }

  back(){
    this.router.navigate(['client']);
  }

  cancellingJob: number
  cancelling: boolean

  cancelJob(JobID){
    this.cancelling = true
    this.cancellingJob = JobID
  }

  reason: string

  cancel(){
    this.objectService.cancelJob(this.cancellingJob, this.reason).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Cancel requested!")
      }
      else{
        alert("Error")
      }
    })
  }

  job_sketching: Number
  enablePaying: boolean;
  job_for_paying: Number;

  pay(JobID){
    this.objectService.payForJob(JobID).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Paid successfully!")
      }
      else{
        alert("Error")
      }
    })
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

  activeJob: boolean
  getAllOffers(){

  }

  allOffers: Job[] = []
  requestedJob: boolean;

  checkIfAccepted(id): boolean{
    this.filteredJobs.forEach(job =>{
      if(job.JobID==id && job.accepted == "A"){
        console.log("true")
        return true;
      }
      else return false;
    })
    return false;
  }

  declineOffer(id){
    this.objectService.declineOffer(id).subscribe(res=>{
      if(res['message']=="ok"){
        alert("offer declined")
        this.ngOnInit()
        //nece da refreshuje odmah stranicu
      }
      else{
        alert("error")
      }
    })
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])

  }

  acceptOffer(id){
    this.objectService.acceptOffer(id).subscribe(res=>{
      if(res['message']=="ok"){
        alert("offer accepted")
        this.ngOnInit()
      }
      else{
        alert("error")
      }
    })
  }

  declined: boolean;
  accepted: boolean;
  filteredJobs: Job[] = []
  selectedJob: string;
  username: string;
  allJobs: Job[] = []

}
