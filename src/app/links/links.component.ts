import { Component, input } from '@angular/core';

@Component({
  selector: 'app-links',
  imports: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent {

  logo = input("NIKE");

}
