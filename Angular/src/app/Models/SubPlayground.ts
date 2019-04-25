import { Reservation } from "./Reservation";
import { Review } from "./review";
import { Playground } from "./Playground";

export class SubPlayground{
    SubPlaygroundID:number;
    Price:number;
    Type:string;
    Rate:number;
    Image:any;
    PlaygroundID:number;
    Playground:Playground;
    Reservation:Reservation[];
    Reviews:Review[];
}