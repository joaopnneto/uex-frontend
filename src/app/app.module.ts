import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsComponent } from './components/contacts/contacts.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/users/login/login.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { ContactFormComponent } from './components/contacts/contact-form/contact-form.component';
import { MasksDirective } from './shared/masks.directive';
import { GoogleMapsModule } from '@angular/google-maps';
import { ProfileComponent } from './components/users/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    UsersComponent,
    LoginComponent,
    SignUpComponent,
    ContactFormComponent,
    MasksDirective,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
