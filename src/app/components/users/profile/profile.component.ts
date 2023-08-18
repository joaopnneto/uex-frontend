import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router){

    this.profileForm = this.formBuilder.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    })
  }

  ngOnInit(){
    this.patchUserInfo();
  }

  onDeleteAccount(){
    if(this.profileForm.valid){
      const id = parseInt(localStorage['id']);
      this.userService.deleteAccount(id).subscribe(
        (response) => {
          this.router.navigate([''])
        }
      ),
      () => {
      }
    }
    else{
      console.log('Preenchimento da senha obrigatório para exclusão de conta')
    }
  }

  patchUserInfo(){
    this.profileForm.patchValue({
      name: localStorage['name'],
      email: localStorage['username']
    })
  }


  onSubmit(){
    if(this.profileForm.valid){
      const id = parseInt(localStorage['id']);
      const name = this.profileForm.get('name')?.value;
      const email = this.profileForm.get('email')?.value;
      const password = this.profileForm.get('password')?.value;
      const password_confirmation = this.profileForm.get('password_confirmation')?.value;

      const user: User = {id, name, email, password, password_confirmation}

      this.userService.updateUser(user).subscribe(
        (response) => {
          this.router.navigate(['/contacts'])
        },
        (error) => {
        }
      )
    }
  }
  onLogout(){
    this.userService.logout().subscribe(
      () => {
        localStorage.clear()
        this.router.navigate(['/'])
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
