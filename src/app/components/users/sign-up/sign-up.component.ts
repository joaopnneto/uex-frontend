import { BindingPipe } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm: FormGroup;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router){
    this.registerForm = this.formBuilder.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      const name = this.registerForm.get('name')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const password_confirmation = this.registerForm.get('password_confirmation')?.value;

      const user: User = {name, email, password, password_confirmation}

      this.userService.register(user).subscribe(
        (response) => {
          this.router.navigate(['/'])
        },
        (error) => {
        }
      )
    }
  }
}
