import { Component, OnInit } from '@angular/core';
import {ReviewsService} from'../../Services/reviews.service';
import {Review} from '../../Models/review';
import { Client } from '../../Models/client';
import { ClientService } from '../../Services/client.service';
import *  as $ from 'jquery';
import { SubPlayground } from '../../Models/SubPlayground';
import { TestBed } from '@angular/core/testing';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {


  constructor(private myReviewsServices:ReviewsService,private myClientServices:ClientService) { }

  ngOnInit() {
    $(document).ready(function(){
      $(".Rate .fa-star").on("click",function(){
        var x=$(this).attr("value");
        $(".rateValueSpan").attr("value",x);
        var y= $(".rateValueSpan").attr("value");
        // console.log(y);
        // console.log(x);
        $(this).removeClass("far").addClass("fas").prevAll().removeClass("far").addClass("fas");
        $(this).nextAll().removeClass("fas").addClass("far");
        
      })
    })
     //this.getSpecificReviews(3);
     // this.deleteReviews(5);
   //this.getAllReviews();
  //  console.log(this.inital);
  //  this.postReviews(this.inital);
   //this.getAllReviews();
  this.getAllRviewAboutSpecificSubPlayground(Number.parseInt(localStorage.getItem('subToReserve')));
  this.getAllClientReviewAboutSpecificSubPlayground(Number.parseInt(localStorage.getItem('subToReserve')));
  this.getSpecificClient(Number.parseInt(localStorage.getItem('CurrentClientID')));
  // this.getSpecificClient(1015);
 
  }
  AllReviewsData:Review[];
  allSpecificReviewData:Review[];
  allClientSpecificReviewData:Client[];
  review:Review;
  currentClient=new Client();
  newReview: Review;
  RateValue;
  newclient: Client;
  newsubPlayground:SubPlayground;
  rateValueIsSet:boolean=true;
  asd(){
    this.rateValueIsSet=true;
  }
  addNewComment(commentText,rateValue)
  {
    this.newReview={
      reviewId:1,
      ClientID:Number.parseInt(localStorage.getItem('CurrentClientID')),
      // ClientID:1015,
      SubPlaygroundID:Number.parseInt(localStorage.getItem('subToReserve')),
      Comment:commentText,
      Rate:rateValue,
      client:this.newclient,
      subPlayground:this.newsubPlayground
    };
    // console.log(commentText);
    // console.log(rateValue);
    this.postReviews(this.newReview);
  }
  getAllReviews()
  {
    this.myReviewsServices.getAllReviews().subscribe((reviewsData)=>{
      this.AllReviewsData=reviewsData;
    },(err)=>{
      console.log(err);
    });
  }
  getSpecificReviews(id)
  {
    this.myReviewsServices.getSpecificReviews(id).subscribe((specificReviewData)=>{
      this.review=specificReviewData  ;
      //this.review.Comment="wowowo"
      //this.putReviews(this.review.reviewId,this.review);
    },(err)=>{
      console.log(err);
    });
  }
  getAllRviewAboutSpecificSubPlayground(id)
  {
    this.myReviewsServices.getAllRviewAboutSpecificSubPlayground(id)
    .subscribe((DataReview)=>{
      this.allSpecificReviewData=DataReview;
    },(err)=>{
      console.log(err);
    })
  }
  getAllClientReviewAboutSpecificSubPlayground(id)
  {
    this.myReviewsServices.getAllClientReviewAboutSpecificSubPlayground(id)
    .subscribe((ClientDataReview)=>{
      this.allClientSpecificReviewData=ClientDataReview;
    },(err)=>{
      console.log(err);
    })
  }
  deleteReviews(id)
  {
    this.myReviewsServices.deleteReviews(id).subscribe((reviewsData)=>{

    },(err)=>{
      console.log(err);
    })
  }
  postReviews(newReview)
  {
    this.myReviewsServices.postReviews(newReview).subscribe((reviewsData)=>{
      window.location.reload();
     this.rateValueIsSet=true;
    },(err)=>{
      // console.log(err);
      this.rateValueIsSet=false;
    })
  }
  putReviews(id,currentReviewNewData)
  {
    this.myReviewsServices.putReviews(id,currentReviewNewData).subscribe((reviewsData)=>{}
    ,(err)=>{
      console.log(err);
    })
  }
  //client
  getSpecificClient(id)
  {
    this.myClientServices.getSpecificClient(id).subscribe((clientData)=>{
      this.currentClient=clientData;
    },(err)=>{
      console.log(err);
    })
  }

}
