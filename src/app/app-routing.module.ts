import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { LoginComponent } from './components/users/login/login.component';
import { ContactFormComponent } from './components/contacts/contact-form/contact-form.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/users/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'contacts/new', component: ContactFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'users/:id', component: ContactFormComponent, canActivate: [AuthGuard]},
  { path: 'sign_up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
