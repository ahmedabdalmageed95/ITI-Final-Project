import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { Client } from '../../Models/client';
import { OwnersService } from '../../Services/owners.service';
import { Owners } from '../../Models/Owners';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Route } from '../../../../node_modules/@angular/compiler/src/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private myRoute:Router,private route:ActivatedRoute,private myClientSrvices:ClientService,private myOwnerServices:OwnersService) { }
clientId;
ownerId;
loginClientData= new Client();
loginOwnerData=new Owners();
  ngOnInit() {
    this.loginClientData.Email=this.route.snapshot.paramMap.get('Email');
    if(localStorage.getItem('CurrentClientID')!=null)
    {
      this.myRoute.navigate(['/client/clubs/reservations']);
    }
    else if (localStorage.getItem('CurrentOwnerID')!=null)
    {
      this.myRoute.navigate(['/owner/clubs/reservations']);
    }
    else
    {
      this.myRoute.navigate(['/users/login']);
    }


    // jQuery

    function validateEmail($email) {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test( $email );
    }

    $("#exampleInputEmail1").keydown(function(){
      var inputValue=$(this).val();
      if(inputValue=="" || !validateEmail(inputValue)){
        $(this).removeClass("success").addClass("failed");
        $("#emailSpan").removeClass("success").removeClass("successSpan").addClass("failed").addClass("failedSpan");
      }
      else
      {
        $(this).removeClass("failed").addClass("success");
        $("#emailSpan").removeClass("failed").removeClass("failedSpan").addClass("success").addClass("successSpan");
      }
    })

    $("#exampleInputEmail1").blur(function(){
      var inputValue=$(this).val();
      if(inputValue=="" || !validateEmail(inputValue)){
        $(this).removeClass("success").addClass("failed");
        $("#emailSpan").removeClass("success").removeClass("successSpan").addClass("failed").addClass("failedSpan");
      }
      else
      {
        $(this).removeClass("failed").addClass("success");
        $("#emailSpan").removeClass("failed").removeClass("failedSpan").addClass("success").addClass("successSpan");
      }
    })

    $("#exampleInputPassword1").blur(function(){
      if($(this).val()==""){
        $(this).removeClass("success").addClass("failed");
        $("#passwordSpan").removeClass("success").removeClass("successSpan").addClass("failed").addClass("failedSpan");
      }
      else
      {
        $(this).removeClass("failed").addClass("success");
        $("#passwordSpan").removeClass("failed").removeClass("failedSpan").addClass("success").addClass("successSpan");
        // $("#iconDiv").addClass("successDiv");
      }
    })

  }

  // login account owner and client
  ClientError:boolean=false;
  OwnerError:boolean=false;
  logIn(email,password,type)
  {
    console.log(type);
    if(type=="Client")
    {
      this.myClientSrvices.loginClient(email,password).subscribe((dataAbutClient)=>{
        this.loginClientData=dataAbutClient;
        this.clientId=this.loginClientData.ClientID;
        this.myRoute.navigate(['/Client']);
        localStorage.setItem('CurrentClientID',this.clientId);
      }
    ,(err)=>{
      this.ClientError=true;
      this.OwnerError=false;
    });
    }
    if(type=="Owner")
    {
      this.myOwnerServices.loginOwner(email,password)
      .subscribe((dataAboutOwner)=>{
        this.loginOwnerData=dataAboutOwner;
        this.ownerId=this.loginOwnerData.OwnerID;
        this.myRoute.navigate(['/Owner']);
        localStorage.setItem('CurrentOwnerID',this.ownerId);
      },
      (err)=>{      
        this.ClientError = false;
        this.OwnerError = true;
      });
    }
  }


}
