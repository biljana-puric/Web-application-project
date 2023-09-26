import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjectsService } from '../objects.service';
import { Objects } from '../models/objects';
import { Router } from '@angular/router';
import { Room } from '../models/room';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  constructor(private objectService: ObjectsService, private router: Router) { }

  ngOnInit(): void {
    this.client = sessionStorage.getItem("username");
    this.drawingEnabled = false;
    this.importfileEnabled = false;
    this.updateAllow = false;
    this.objectService.getAllObjects(this.client).subscribe((data: Objects[])=>{
      this.allObjects = data;
    });
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])

  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
  }

  lastMouseX: number;
  lastMouseY: number;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private isDrawing: boolean;
  private startPoint: { x: number, y: number };
  private currentRoom: { x: number, y: number, width: number, height: number };
  private doors: { x: number, y: number}[] = [];

  allRooms: { x: number, y: number, width: number, height: number, status: String, room_number: Number}[] = []
  roomWidth: number;
  roomHeight: number;
  selectedRoom: any
  isDraggingRoom: boolean = false;
  allObjects : Objects[] = [];
  client: string;
  object_type: string;
  address: string;
  rooms: number;
  space: string;
  sketchFile: JSON;
  obj: Objects;
  isRoomSelected: boolean = false;
  drawingEnabled: boolean
  importfileEnabled: boolean
  doorEnabled: boolean;
  fileContent : string
  room: Room[] = []

  onFileSelected(event){
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.fileContent= reader.result as string;
    };

    reader.readAsText(file);
  }

  uploadObject(){
    const prost = JSON.parse(this.fileContent);
    for (let index = 0; index < prost.length; index++) {
      this.room[index] = prost[index];
      this.room[index].status = "waiting"
    }
    
    this.objectService.uploadObject(this.room, this.client, this.object_type, this.address, this.rooms, this.space).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Object added!")
        this.ngOnInit();
      }
      else{
        alert("Error")
      }
    })
  }

  deleteObject(id){
    this.objectService.deleteObject(id).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Object deleted!")
        this.ngOnInit();
      }
      else{
        alert("Error")
      }
    })
  }

  updateAllow: boolean
  updatingObject: Objects
  updateRooms: { x: number, y: number, width: number, height: number, status: String, room_number: Number,
      door: [{x: number, y: number}]}[] = []

  updateThis(){
    this.objectService.updateObject(this.updatingObject.id, this.updatingObject.address, 
          this.updatingObject.rooms, this.updatingObject.space, this.updatingObject.object_type,
          this.updateRooms).subscribe(resp=>{
      if(resp["message"]=="ok"){
        alert("Object updated!")
        this.ngOnInit();
      }
      else{
        alert("Error")
      }
    })
  }

  
  updateObject(id){
    this.updateAllow = true;
    this.objectService.getMyInfo(id).subscribe((data: Objects)=>{
      this.updatingObject = data;
      this.updateRooms = this.updatingObject.sketch.map(room => {
        return {
          x: room.x,
          y: room.y,
          width: room.width,
          height: room.height,
          status: room.status,
          room_number: room.room_number,
          door: room.door
        };
      });
    })
  }

  onCanvasMouseDown(event: MouseEvent): void {
    const { offsetX, offsetY } = event;

    // Store initial mouse coordinates
    this.lastMouseX = offsetX;
    this.lastMouseY = offsetY;

    if (this.isRoomSelected) {
      if (!this.isDraggingRoom && this.doorEnabled) {
        const margin = 10; // Adjust this value as needed
    
        // Calculate the clicked position relative to the room's top-left corner
        const relativeX = offsetX - this.selectedRoom.x;
        const relativeY = offsetY - this.selectedRoom.y;
    
        // Check if the clicked position is within the margin of the room's edge
        const isOnEdge =
        offsetX >= this.selectedRoom.x - margin &&
        offsetX <= this.selectedRoom.x + this.selectedRoom.width + margin &&
        offsetY >= this.selectedRoom.y - margin &&
        offsetY <= this.selectedRoom.y + this.selectedRoom.height + margin;

        // If the clicked position is on the edge, add the door
        if (isOnEdge) {
          // Calculate the position of the door relative to the canvas
          const doorX = this.selectedRoom.x + relativeX;
          const doorY = this.selectedRoom.y + relativeY;
    
          // Check if the door position collides with any existing doors
          const isDoorColliding = this.doors.some(door => {
            return (
              doorX >= door.x - margin &&
              doorX <= door.x + margin &&
              doorY >= door.y - margin &&
              doorY <= door.y + margin
            );
          });
    
          // If the door position does not collide with any existing doors, add the door
          if (!isDoorColliding) {
            const newDoor = { x: doorX, y: doorY };
            this.doors.push(newDoor);
            this.drawDoor(newDoor);
            this.doorEnabled = false;
          }
        }
      }
    }

    if (!this.isRoomSelected) {
      this.startPoint = { x: offsetX, y: offsetY };

      // Check if a room is clicked
      for (const room of this.allRooms) {
        if (
          offsetX >= room.x &&
          offsetX <= room.x + room.width &&
          offsetY >= room.y &&
          offsetY <= room.y + room.height
        ) {
          this.isRoomSelected = true;
          this.selectedRoom = room;
          break;
        }
      }

      // If no room is clicked, create a new room
      if (!this.isRoomSelected) {
        // Create current room using the entered dimensions
        const newRoom = {
          x: this.startPoint.x,
          y: this.startPoint.y,
          width: this.roomWidth,
          height: this.roomHeight,
          status: "waiting",
          room_number: this.allRooms.length
        };

        if (this.allRooms.length >= this.rooms) {
          console.log('Max number of rooms reached');
          return; // Exit the method if the maximum number of rooms is reached
        }

        // Add current room to the saved rooms array
        this.allRooms.push(newRoom);
        console.log(newRoom)

        // Set the new room as selected
        this.isRoomSelected = true;
        this.selectedRoom = newRoom;

        // Draw current room
        this.drawRoom(newRoom);
      }
    }
  }

  back(){
    this.router.navigate(['client']);
  }

  checkCollision(room1: any, room2: any): boolean {
    return (
      room1.x < room2.x + room2.width &&
      room1.x + room1.width > room2.x &&
      room1.y < room2.y + room2.height &&
      room1.y + room1.height > room2.y
    );
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if(this.doorEnabled) return
    const canvasWidth = this.canvasRef.nativeElement.width;
    const canvasHeight = this.canvasRef.nativeElement.height;
    if (this.isRoomSelected) {
      const { offsetX, offsetY } = event;
      const dx = offsetX - this.lastMouseX;
      const dy = offsetY - this.lastMouseY;
  
      // Calculate the new position of the selected room
      const newX = this.selectedRoom.x + dx;
      const newY = this.selectedRoom.y + dy;
  
      // Check if the new position is within the canvas boundaries
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX + this.selectedRoom.width <= canvasWidth &&
        newY + this.selectedRoom.height <= canvasHeight
      ) {

        const isColliding = this.allRooms.some(room => {
          if (room !== this.selectedRoom) {
            return (
              newX < room.x + room.width &&
              newX + this.selectedRoom.width > room.x &&
              newY < room.y + room.height &&
              newY + this.selectedRoom.height > room.y
            );
          }
          return false;
        });

        //console.log(isColliding)
        if (isColliding) {
          this.ctx.fillStyle = 'red';
          this.selectedRoom.x = this.lastMouseX - dx;
          this.selectedRoom.y = this.lastMouseY - dy;
        }
        // Clear canvas
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
        // Update position of the selected room
        this.selectedRoom.x = newX;
        this.selectedRoom.y = newY;
  
        // Draw saved rooms
        for (const room of this.allRooms) {
          this.drawRoom(room);
        }
  
        // Draw doors
        for (const door of this.doors) {
          this.drawDoor(door);
        }
      }
  
      // Update last mouse coordinates
      this.lastMouseX = offsetX;
      this.lastMouseY = offsetY;
    }
  }

  clearCanvas(): void {
    this.allRooms = [];
    this.currentRoom = null;
    this.doors = [];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  onCanvasMouseUp(event: MouseEvent): void {
    if (this.isRoomSelected) {
      // Check collision with other rooms
      const isColliding = this.allRooms.some(room => {
        if (room !== this.selectedRoom) {
          return (
            this.selectedRoom.x < room.x + room.width &&
            this.selectedRoom.x + this.selectedRoom.width > room.x &&
            this.selectedRoom.y < room.y + room.height &&
            this.selectedRoom.y + this.selectedRoom.height > room.y
          );
        }
        return false;
      });
  
      // If there is a collision, remove the selected room
      if (isColliding) {
        const index = this.allRooms.indexOf(this.selectedRoom);
        if (index !== -1) {
          this.allRooms.splice(index, 1);
        }
      }
  
      // Clear canvas
      const canvasWidth = this.canvasRef.nativeElement.width;
      const canvasHeight = this.canvasRef.nativeElement.height;
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
      // Draw saved rooms
      for (const room of this.allRooms) {
        this.drawRoom(room);
      }
  
      // Draw doors
      for (const door of this.doors) {
        this.drawDoor(door);
      }
    }
    this.isRoomSelected = false;
  }

  drawRoom(room: any): void {
    this.ctx.beginPath();
    this.ctx.rect(room.x, room.y, room.width, room.height);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawDoor(door: { x: number, y: number }): void {
    this.ctx.fillStyle = 'brown';
    this.ctx.fillRect(door.x - 5, door.y - 5, 30, 20);
  }

  addDoor(): void {
    this.doorEnabled = true;
  }

  addObject(){
    this.objectService.addObject(this.client, this.object_type, this.address, this.rooms, this.space, this.allRooms).subscribe(resp=>{
        if(resp["message"]=="ok"){
          alert("added!")
        }
        else{
          alert("error")
        }
      })
  }

  drawEnable(){
    this.drawingEnabled = true;
    this.importfileEnabled = false;
  }

  importFileEnable(){
    this.drawingEnabled = false;
    this.importfileEnabled = true;
  }


  sketch(id){
    this.clearCanvas()
    this.objectService.getMyInfo(id).subscribe((data: Objects) => {
      this.obj = data;
      this.allRooms = this.obj.sketch.map(room => {
        //this.doors = room.door
        room.door.forEach(d => {
          this.doors.push(d)
        });
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
}
