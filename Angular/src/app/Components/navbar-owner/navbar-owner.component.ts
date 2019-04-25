import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router'
import { Owners } from '../../Models/Owners';
import { OwnersService } from '../../Services/owners.service';

@Component({
  selector: 'app-navbar-owner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.css']
})
export class NavbarOwnerComponent implements OnInit {

  currentOwnerData = new Owners();
  ownerId;
  CurrentOwnerID;

  constructor(private myRoute: Router, private route: ActivatedRoute, private ownerServ: OwnersService) { }

  ngOnInit() {
    if(localStorage.getItem('CurrentOwnerID')==null){
      this.myRoute.navigate(['/index']);
    }

    this.ownerId = Number.parseInt(localStorage.getItem('CurrentOwnerID'));
    this.GetSpecificOwner(this.ownerId);
    this.CurrentOwnerID= localStorage.getItem('CurrentOwnerID');

  }
GetSpecificOwner(id) {
    this.ownerServ.GetSpecificOwner(id).subscribe((SpecificOwner) => {
      this.currentOwnerData = SpecificOwner;
    })
  }

  LogOut(){
    localStorage.removeItem('CurrentClientID');
    localStorage.removeItem('CurrentOwnerID');
    this.myRoute.navigate(['/index']);
  }
}
