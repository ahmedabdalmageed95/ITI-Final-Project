import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../Services/client.service';
import { Client } from '../../Models/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientID: number;
  EditClientData = new Client();
  cities:Array<string>=["Alexandria","Aswan","Badr","Beni Suef","Bilbies","Cairo","Dahab","Damanhur","Damietta","Faiyum","Giza","Hurghada","Ismailia","Kafr El Sheikh","Luxor","Mansoura","Marsa Matruh","Minya","Port Said","Qena","Sharm El Sheikh","Tanta","Zagazig","6 October"]
  constructor(
    private clientService:ClientService,
    private myRoute:Router
    ) { }
  ngOnInit() {
    if(localStorage.getItem('CurrentClientID')==null){
      this.myRoute.navigate(['/Index']);
    }
    this.clientID = Number.parseInt(localStorage.getItem('CurrentClientID'));
    this.GetSpecificClient(this.clientID);
  }
  GetSpecificClient(id) {
    this.clientService.getSpecificClient(id).subscribe((SpecificClient) => {
      this.EditClientData = SpecificClient;
    })
  }

  //----------------------------- Edit Client -----------------------------
  EditClient(_firstName,_lastName,_NationalityId,_Age,_Phone1,_Phone2,_City,_Street,_gander){
    //jquery game
    $("#saveChanges").attr('disabled','disabled').css("cursor","wait").html("<i class='fas fa-spinner fa-spin'></i> Saving<span id='dots'></span>");
    var dots = 0;
    $(document).ready(function () {
      setInterval(type, 600);
    });
    function type() {
      if (dots < 3) {
        $('#dots').append('.');
        dots++;
      } else {
        $('#dots').html('');
        dots = 0;
      }
    }​
    //end jquery
    let EditedData= new Client();
    EditedData={
      Age:_Age,
      City:_City,
      Country:"Egypt",
      FirstName:_firstName,
      LastName:_lastName,
      Gender:_gander,
      NationalityID:_NationalityId,
      Phone1:_Phone1,
      Phone2:_Phone2,
      Street:_Street,
      Password:this.EditClientData.Password,
      Email:this.EditClientData.Email,
      ClientID:this.EditClientData.ClientID,
      ClientPicture:this.EditClientData.ClientPicture,
      Reservatin:this.EditClientData.Reservatin,
      Reviews:this.EditClientData.Reviews,
      Balance:this.EditClientData.Balance
    }
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.PutClient(EditedData.ClientID, EditedData);
    }, 1500);
  }

  PutClient(id, CurrentClientData) {
    this.clientService.putClient(id, CurrentClientData).subscribe(() => {
      $("#succBtn").trigger('click');
      $("#saveChanges").html("<i class='fas fa-check'></i> Saved!");
      setTimeout(() => {   
        $(".close").trigger('click');
        this.myRoute.navigateByUrl("/index");
      }, 2500);
    }, (err) => {
      console.log(err);
    })
  }

}
