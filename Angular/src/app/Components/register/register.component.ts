import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../Models/client';
import { Owners } from '../../Models/Owners';
import { Reservation } from '../../Models/Reservation';
import { Review } from '../../Models/review';
import { ClientService } from '../../Services/client.service';
import { OwnersService } from '../../Services/owners.service';
import { Form } from '@angular/forms'
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private myRoute:Router, private myClientService :ClientService,private myOwnerService :OwnersService) { }
  formClient=new Client()
  newClient=new Client();
  CofirmPassword;
  newOwner=new Owners();
  reservations:Reservation[];
  reviews:Review[];
  extraPhone:boolean=false;
  extraPhoneBtn:boolean=true;
  cities:Array<string>=["Alexandria","Aswan","Badr","Beni Suef","Bilbies","Cairo","Dahab","Damanhur","Damietta","Faiyum","Giza","Hurghada","Ismailia","Kafr El Sheikh","Luxor","Mansoura","Marsa Matruh","Minya","Port Said","Qena","Sharm El Sheikh","Tanta","Zagazig","6 October"]
  
  ngOnInit() {
    $(document).ready(function(){
      $('.show').hide();
    })
    document.body.classList.add('bg-img');

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
      this.myRoute.navigate(['/users/registration']);
    }
  }
  //registration function
  register(email,password, accountType,firstName,lastName,nationalityId,phone1,phone2,age,city,street,gander)
  {
    if(accountType=="Client")
    {
        this.newClient={ClientID:1,NationalityID:nationalityId,FirstName:firstName,LastName:lastName,Phone1:phone1,Phone2:phone2,Age:age,Email:email,Password:password,Balance:0,Country:'egypt',City:city,Street:street,Gender:gander,Reservatin:this.reservations,Reviews:this.reviews,ClientPicture:null};
        this.postClient(this.newClient)
    }
    else if(accountType=="Owner")
    {
        this.newOwner={OwnerID:1,NationalityID:nationalityId,FirstName:firstName,LastName:lastName,Phone1:phone1,Phone2:phone2,Age:age,Email:email,Password:password,Country:'egypt',City:city,Street:street,Gender:gander,Reservatin:this.reservations,Reviews:this.reviews,OwnerPicture:null};
        this.PostOwner(this.newOwner);
    }
  }
  // add new client
  postClient(newClient)
  {
     this.myClientService.postClient(newClient).subscribe((clientData)=>{
       this.myRoute.navigate(['/users/login',{Email:newClient.Email}]);
    },(err)=>{
      console.log(err);
    })
  }
  // add new Owner
  PostOwner(NewOwner)
  {
    this.myOwnerService.PostOwner(NewOwner).subscribe((AllOwnerData)=>{
      this.myRoute.navigate(['/users/login',{Email:NewOwner.Email}]);
    }, (err)=>{
      // console.log(err);
      this.myRoute.navigate(['/users/login',{Email:NewOwner.Email}])
    })
  }

  ShowExtraPhone()
  {
this.extraPhone=true;
this.extraPhoneBtn=false;
// console.log(this.extraPhone);
  }


  mailIsFounded: boolean = true;
  CheckUniqueEmail(email, id) {
    if (email != '') {
      this.myClientService.CheckUniqueEmail(email, id).subscribe((returnValue) => {
        this.mailIsFounded = returnValue;
        
      }, (err) => {
        console.log(err);
      })
    }
    else {
      this.mailIsFounded = true;
        $('.show').show();
    }

  }
}
