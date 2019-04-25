import { Reservation } from "./Reservation";
import { Review } from "./review";

export class Owners 
{

    OwnerID:number;
    NationalityID:number;
    FirstName:string;
    LastName:string;
    Age:number;
    Country:string;
    City:string;
    Street:string;
    Phone1:string;
    Phone2:string;
    Email:string;
    Password:string;
    Gender:string;
    OwnerPicture:number[];
    Reservatin:Reservation[];
    Reviews:Review[];
}
