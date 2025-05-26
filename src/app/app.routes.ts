import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: FormComponent,
    data: { mode: 'login' }
  },
  {
    path: 'register',
    component: FormComponent,
    data: { mode: 'register' }
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
