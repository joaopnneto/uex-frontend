import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contacts: Contact[] = [];
  lat!: number;
  lng!: number;

  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  center!: google.maps.LatLngLiteral;
  markerPosition: google.maps.LatLngLiteral = {lat: this.lat, lng: this.lng };

  constructor(
    private userService: UsersService,
    private router: Router,
    private contactService: ContactsService
  ){}

  ngOnInit(){
    this.getContacts();
    this.initMap();
  }

  initMap(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.markerPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  getCurrentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (params) => {
          this.lat = params.coords.latitude;
          this.lng = params.coords.longitude;
        }
      );
    }
  }

  onLogout(){
    this.userService.logout().subscribe(
      () => {
        localStorage.removeItem('token')
        this.router.navigate(['/'])
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getContacts(){
    this.contactService.getAllContacts().subscribe(
      (response) => {
        this.contacts = response;
      },
      (error) => {
      }
    )
  }

  onDelete(contactId: number){
    this.contactService.deleteContact(contactId).subscribe(
      () => {
        this.getContacts();
      }
    )
  }

  addPin(contact: any){
    console.log(contact);

    this.center = {
      lat: parseFloat(contact.coordinate.latitude),
      lng: parseFloat(contact.coordinate.longitude),
    };
    this.markerPosition = {
      lat: parseFloat(contact.coordinate.latitude),
      lng: parseFloat(contact.coordinate.longitude),
    };
  }
}
