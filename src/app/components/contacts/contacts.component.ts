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

  constructor(
    private userService: UsersService,
    private router: Router,
    private contactService: ContactsService
  ){}

  ngOnInit(){
    this.getContacts();
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
}
