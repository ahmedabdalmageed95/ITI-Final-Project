import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  status;

  ngOnInit() {
if(localStorage.getItem('CurrentClientID')!=null)
{
this.status=2;
}
else if(localStorage.getItem('CurrentOwnerID')!=null)
{
  this.status=1;
}
else{
  this.status=0;
}
  }

}
