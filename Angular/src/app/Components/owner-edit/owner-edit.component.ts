import { Component, OnInit } from '@angular/core';
import { Owners } from '../../Models/Owners';
import { OwnersService } from '../../Services/owners.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
  ownerID: number;
  EditOwnerData = new Owners();
  cities:Array<string>=["Alexandria","Aswan","Badr","Beni Suef","Bilbies","Cairo","Dahab","Damanhur","Damietta","Faiyum","Giza","Hurghada","Ismailia","Kafr El Sheikh","Luxor","Mansoura","Marsa Matruh","Minya","Port Said","Qena","Sharm El Sheikh","Tanta","Zagazig","6 October"]
  constructor(
    private ownerService:OwnersService,
    private myRoute:Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem('CurrentOwnerID')==null){
      this.myRoute.navigate(['/index']);
    }
    this.ownerID = Number.parseInt(localStorage.getItem('CurrentOwnerID'));
    this.GetSpecificOwner(this.ownerID);
  }
  GetSpecificOwner(id) {
    this.ownerService.GetSpecificOwner(id).subscribe((SpecificOwner) => {
      this.EditOwnerData = SpecificOwner;
    })
  }
  //----------------------------- Edit Owner -----------------------------
  EditOwner(_firstName,_lastName,_NationalityId,_Age,_Phone1,_Phone2,_City,_Street,_gander){
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
    let EditedData= new Owners();
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
      Password:this.EditOwnerData.Password,
      Email:this.EditOwnerData.Email,
      OwnerID:this.EditOwnerData.OwnerID,
      OwnerPicture:this.EditOwnerData.OwnerPicture,
      Reservatin:this.EditOwnerData.Reservatin,
      Reviews:this.EditOwnerData.Reviews,
    }
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.PutOwner(EditedData.OwnerID, EditedData);
    }, 1500);
  }

  PutOwner(id, CurrentOwnerData) {
    this.ownerService.PutOwner(id, CurrentOwnerData).subscribe(() => {
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
