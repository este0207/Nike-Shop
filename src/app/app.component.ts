import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { CardContainerComponent } from "./card-container/card-container.component";
import { StartscreenComponent } from "./startscreen/startscreen.component";
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HomeComponent, CardContainerComponent, StartscreenComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mini_shop';

  NgOnInit(){
    if (window.scrollY) {
      window.scroll(0, 0); 
    }
  }
}
