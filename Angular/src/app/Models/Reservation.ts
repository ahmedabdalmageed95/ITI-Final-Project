import { Client } from "./client";
import { SubPlayground } from "./SubPlayground";

export class Reservation{
    ReservationID:number;
    ClientID:number;
    SubPlaygroundID:number;
    From:number;
    To:number;
    Year:number;
    Month:number;
    Day:number;
    NumberOfHours:number;
    TotalMoney:number;
    ReservationISDone:boolean;
    Client: Client;
    SubPlayground: SubPlayground; 
}