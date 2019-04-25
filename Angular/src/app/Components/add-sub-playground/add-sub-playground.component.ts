import { Component, OnInit } from '@angular/core';
import { SubPlayground } from '../../Models/SubPlayground';
import { SubplaygroundsService } from '../../Services/subplaygrounds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-playground',
  templateUrl: './add-sub-playground.component.html',
  styleUrls: ['./add-sub-playground.component.css']
})
export class AddSubPlaygroundComponent implements OnInit {
  FormSubPlayGround = new SubPlayground();
  SubPlayGroundObject: SubPlayground;

  constructor(private myServ2:SubplaygroundsService,private myRouter:Router) { }

  ngOnInit() {
    document.body.classList.add('bg-img');

  }
  GetSubPlayGroundData(_subplaygroundPrice, _subplaygroundType, _subplaygroundImage) {
    this.SubPlayGroundObject = {
      Price:_subplaygroundPrice,
      Type:_subplaygroundType,
      Image:_subplaygroundImage,
      PlaygroundID:Number.parseInt(localStorage.getItem('AddSubToPlaygroundID')),
      Playground:null,
      Rate:0,
      Reservation:null,
      Reviews:null,
      SubPlaygroundID:0,
    }
    this.PostSubPlayground(this.SubPlayGroundObject);
    // console.log(this.SubPlayGroundObject);
  }

  
PostSubPlayground(SubPlaygroundObject){
  this.myServ2.PostSubPlayground(SubPlaygroundObject).subscribe();
  this.myRouter.navigate(['/owner/clubs']);

}
}
