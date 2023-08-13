import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  constructor(
    private userService: UsersService,
    private router: Router
  ){}

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
}
