import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const user: User = {email, password}

      this.userService.login(user).subscribe(
        (response) => {
          localStorage.setItem('token', response.current_user.auth_token)
          this.router.navigate(['/contacts'])
        },
        (error) => {
          this.error = error.error['error']
        }
      )
    }
  }
}
