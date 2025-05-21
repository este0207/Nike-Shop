import { Component } from '@angular/core';
import { LinksComponent } from "../links/links.component";
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-navbar',
  imports: [LinksComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showForm(){
    const form = document.querySelector(".form-container");

    if (form) {
      form.classList.toggle("active");
    }
  }
}
