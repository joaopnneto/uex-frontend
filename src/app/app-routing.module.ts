import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { LoginComponent } from './components/users/login/login.component';
import { ContactFormComponent } from './components/contacts/contact-form/contact-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'contacts/new', component: ContactFormComponent, canActivate: [AuthGuard] },
  { path: 'contacts/edit/:id', component: ContactFormComponent, canActivate: [AuthGuard]},
  { path: 'sign_up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
