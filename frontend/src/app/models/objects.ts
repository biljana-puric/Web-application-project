export class Objects{
    id: Number;
    object_type: string;
    address: string;
    rooms: number;
    space: number;
    client: string;
    sketch: [{ x: number, y: number, width: number, height: number, door: [{x: number, y: number}], status: String, room_number: Number}]
}