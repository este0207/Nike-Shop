import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
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

    onSubmit() {
      console.log('Suggestion soumise:', this.Loginform);
      // Ici, vous pourriez ajouter la logique pour envoyer les données à un backend
    }

    resetForm() {
      this.Loginform = {
        Name: '',
        Lastname: '',
        email: '',
        Password: '',
      };
    }

    showForm(){
      console.log('Suggestion soumise:', this.Loginform);
    }
}
