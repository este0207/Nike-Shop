import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  Loginform = {
    Name: '',
    Lastname: '',
    email: '',
    Password: '',
  };

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Formulaire soumis:', this.Loginform);
    // Stockage des données dans localStorage
    localStorage.setItem("form", JSON.stringify(this.Loginform));
  }
    
  resetForm() {
    this.Loginform = {
      Name: '',
      Lastname: '',
      email: '',
      Password: '',
    };
    // Effacer les données du localStorage lors de la réinitialisation
    localStorage.removeItem("form");
  }

  showForm() {
    console.log('État actuel du formulaire:', this.Loginform);
  }
}
