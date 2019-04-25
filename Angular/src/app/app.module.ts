import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
//----------------------------------------------------------
//Services
import { NewServiceService } from './Services/new-service.service';
import { PlaygroundService } from './Services/playground.service';
import { ClientService } from './Services/client.service';
import { ReviewsService } from './Services/reviews.service';
import { ReservationsService } from './Services/reservations.service';
import { SubplaygroundsService } from './Services/subplaygrounds.service';
import { OwnersService } from './Services/owners.service'
//-------------------------------------------------------
//component
import { AppComponent } from './app.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddPlayGroundComponent } from './Components/add-play-ground/add-play-ground.component';
import { OwnerClubsComponent } from './Components/owner-clubs/owner-clubs.component';
import {IndexComponent} from './Components/index/index.component'
import { SearchComponent } from './Components/search/search.component';
import { AddSubPlaygroundComponent } from './Components/add-sub-playground/add-sub-playground.component';
import { OwnerReservationComponent } from './Components/owner-reservation/owner-reservation.component';
import { ReservationComponent } from './Components/reservation/reservation.component'
import {CommentsComponent} from './Components/comments/comments.component'
import { ClientReservationsComponent } from './Components/client-reservations/client-reservations.component';
import { OwnerEditComponent } from './Components/owner-edit/owner-edit.component';
import { ClientEditComponent } from './Components/client-edit/client-edit.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import {NavbarComponent} from './Components/navbar/navbar.component'
import {NavbarClientComponent} from './Components/navbar-client/navbar-client.component'
import {NavbarOwnerComponent} from './Components/navbar-owner/navbar-owner.component'

// declarations: pipes ,components
// Modules:modules from out
// providers: services
const appRoutes: Routes = [
  { path: 'users/login', component: LogInComponent},
  { path: 'users/registration', component: RegisterComponent },
  { path: 'owner/clubs', component: OwnerClubsComponent },
  { path: 'owner/clubs/add', component: AddPlayGroundComponent },
  { path: 'owner/clubs/reservations', component: OwnerReservationComponent },
  { path: 'owner/clubs/addSub', component: AddSubPlaygroundComponent },
  { path: 'owner/edit', component: OwnerEditComponent },
  { path: 'client/edit', component: ClientEditComponent },
  { path: 'client/clubs/reservations', component: ClientReservationsComponent },
  { path: 'client/clubs/reserve', component: ReservationComponent },
  { path: 'clubs/search', component: SearchComponent },
  { path: 'clubs/reviews', component: CommentsComponent },
  { path: 'index', component: IndexComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', redirectTo: 'index', pathMatch: 'full' },
  
  // { path: 'login', component: LogInComponent},
  // { path: 'register', component: RegisterComponent},
  // { path: 'registration', component: RegisterComponent },
  // { path: 'owner', component: OwnerCompComponent },
  // { path: 'clubs', component: OwnerClubsComponent },
  // { path: 'addClub', component: AddPlayGroundComponent },
  // { path: 'ownerReservations', component: OwnerReservationComponent },
  // { path: 'addSub', component: AddSubPlaygroundComponent },
  // { path: 'editOwner', component: OwnerEditComponent },
  // { path: 'editClient', component: ClientEditComponent },
  // { path: 'clientReservations', component: ClientReservationsComponent },
  // { path: 'reserve', component: ReservationComponent },
  // { path: 'search', component: SearchComponent },
  // { path: 'reviews', component: CommentsComponent },
  // { path: 'index', component: IndexComponent },
  // { path: 'contact-us', component: ContactUsComponent },
  // { path: '**', redirectTo: 'index', pathMatch: 'full' },
];
@NgModule({
  declarations: [AppComponent,NavbarComponent,NavbarClientComponent,NavbarOwnerComponent,ContactUsComponent,ClientReservationsComponent,OwnerReservationComponent,ReservationComponent, CommentsComponent,SearchComponent, OwnerClubsComponent, IndexComponent,AddPlayGroundComponent, LogInComponent, RegisterComponent,  AddSubPlaygroundComponent, OwnerEditComponent, ClientEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    NewServiceService,
    PlaygroundService,
    ClientService,
    ReviewsService,
    ReservationsService,
    SubplaygroundsService,
    OwnersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
