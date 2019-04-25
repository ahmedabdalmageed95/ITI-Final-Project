import { Client } from "./client";
import { SubPlayground } from "./SubPlayground";

export class Review {
  reviewId:number;
  ClientID:number;
  SubPlaygroundID:number;
  Comment:string;
  Rate:number;
  client:Client;
  subPlayground:SubPlayground;
}
