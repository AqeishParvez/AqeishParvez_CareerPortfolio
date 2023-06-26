import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
sendButtonClick() {
  alert("This form is currently not operational. Kindly use the email address and phone number provided to contact me.")
}

}
