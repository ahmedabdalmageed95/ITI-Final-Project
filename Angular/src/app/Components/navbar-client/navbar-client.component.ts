import { Component, OnInit } from '@angular/core';
import { Client } from '../../Models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../Services/client.service';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.css']
})
export class NavbarClientComponent implements OnInit {

  currentClientData = new Client();
  clientId;
  CurrentClientID;
  constructor(private myRoute: Router, private route: ActivatedRoute, private clientServ: ClientService) { }

  ngOnInit() {
    if(localStorage.getItem('CurrentClientID')==null){
      this.myRoute.navigate(['/index']);
    }

    this.clientId = Number.parseInt(localStorage.getItem('CurrentClientID'));
    this.GetSpecificClient(this.clientId);
    this.CurrentClientID= localStorage.getItem('CurrentClientID');
  }

  GetSpecificClient(id) {
    this.clientServ.getSpecificClient(id).subscribe((SpecificClient) => {
      this.currentClientData = SpecificClient;
    })
  }

  LogOut(){
    localStorage.removeItem('CurrentClientID');
    localStorage.removeItem('CurrentOwnerID');
    this.myRoute.navigate(['/index']);
  }
}
