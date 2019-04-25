import { Component, OnInit } from '@angular/core';
// import Typed from 'typed.js';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private myRoute:Router) {}

  ngOnInit() {
    if(localStorage.getItem('CurrentOwnerID')!=null){
      this.myRoute.navigate(['/owner/clubs/reservations']);
    }
    else if(localStorage.getItem('CurrentClientID')!=null){
      this.myRoute.navigate(['/client/clubs/reservations']);
    }
    else
    {
      this.myRoute.navigate(['/index']);
    }


    var pos = 0;
    var turn = 0;
    var data = ["Mego Kora!","Let's Reserve Your Favourite Playground",'Number one in Egypt!'];
    var speed = 100;
    
    setTimeout(typeWriter, speed);
    
    function typeWriter() {
      if (pos < data[turn].length) {
        document.getElementById("demo").innerHTML += data[turn].charAt(pos);
        pos++;
        setTimeout(typeWriter, speed);
      } else {
        setTimeout(erase, speed+100);
      }
    }
   
    function erase() {
      if (pos >= 0) {
          var str=data[turn].toString().substring(0, pos);
          document.getElementById("demo").innerHTML = str;
          pos--;
         
          setTimeout(erase, speed-30);
        } else {
          turn++;
          if(turn>=data.length) 
            turn=0;
          setTimeout(typeWriter, speed);
        }
    }
    


    // var thetext = $('.typer').data('text'),
    //   thetextlenght = thetext.length,
    //   n = 0,

    //   thetyper = setInterval(function () {

    //     $('.typer').each(function () {

    //       $(this).html($(this).html() + thetext[n]);
    //     });
    //     n += 1;

    //     if (n === thetextlenght) {

    //       clearInterval(thetyper);
    //     }
    //   }, 100);

  }
}
