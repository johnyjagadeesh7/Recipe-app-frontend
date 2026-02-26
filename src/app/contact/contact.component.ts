import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  demoMail: string = "cookbook@gmail.com"

  // for client testimonial
  testyMonyForm: FormGroup



  // injecting Formbuilder class and api

  constructor(private Fb: FormBuilder, private api: ApiService) {
    this.testyMonyForm = this.Fb.group({   //here created the group in the form
      name: [''],
      email: [''],
      message: [''],
    })
  }
  // for submit button,taking values from name ,email,message
  addTestimony() {
    const name = this.testyMonyForm.value.name
    const email = this.testyMonyForm.value.email
    const message = this.testyMonyForm.value.message


    if (name&&email&&message) {
      //if these values are get then,api call
      this.api.addTestimonyAPI({ name, email, message }).subscribe(res => {
        alert("thank you for submitting your valuable feedback")
        this.testyMonyForm.reset()
      })
    } else {
      alert("please fill the missing fields")
    }
  }



}
