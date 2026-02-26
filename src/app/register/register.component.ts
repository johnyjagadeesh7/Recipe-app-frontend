import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // ppty
  registerForm:FormGroup


  // DEPENDENCY INJECTION(1.API 2.FORMbuilder 3.Angular Router-for navigate to particular pg)

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
    this.registerForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],

    })

  }

  register(){ //fn run after button press
    if(this.registerForm.valid){
      const reqBody={
        name:this.registerForm.value.name,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
      }

      this.api.registerAPI(reqBody).subscribe({ //here we not used call back,we need to create object as observable (like ..react..success and error) so we use next&error
        
        next:(res:any)=>{
          alert(`welcome ${res.name} & please login to explore recipes`)
          this.registerForm.reset()
          this.router.navigateByUrl('/login') //here used angular/router to navigate

        },
        error:(reason:any)=>{
          alert(reason.error)
        }
      })

    }else{
      alert("invalid form")
    }
  }



}
