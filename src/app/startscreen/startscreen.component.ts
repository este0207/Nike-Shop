import { Component } from '@angular/core';
import { StartbtnComponent } from "../startbtn/startbtn.component";

@Component({
  selector: 'app-startscreen',
  imports: [StartbtnComponent],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.css'
})
export class StartscreenComponent {

  onStartClick() {
    const startscreen = document.querySelector(".startscreen")

    if (startscreen) {
      startscreen.classList.add("active");
      setTimeout(() => {
        startscreen.classList.add("none");
        document.body.style.overflowY = "scroll";
      }, 500);
    }
    
  }

}
