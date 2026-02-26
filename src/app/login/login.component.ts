import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // ppty
    loginForm:FormGroup
  
  
    // DEPENDENCY INJECTION(1.API 2.FORMbuilder 3.Angular Router-for navigate to particular pg)
  
    constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
      this.loginForm=this.fb.group({
        
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  
      })
  
    }

    login(){ //run the function after button click
      if(this.loginForm.valid){
        const reqBody={
           email:this.loginForm.value.email,
          password:this.loginForm.value.password,
        }
        this.api.loginAPI(reqBody).subscribe({
          next:(res:any)=>{
            sessionStorage.setItem("user",JSON.stringify(res.existingUser))   //herev used sessionstorage to store user and token
            sessionStorage.setItem("token",res.token)
            this.loginForm.reset()
            //this.router.navigateByUrl('/')  ......//navigate to base pg,we need to go admindashboard pg while admin logins
            if(res.existingUser.role=='user'){ //here we used "role" which is specified in model
              this.router.navigateByUrl('/')
            }else{
              this.router.navigateByUrl('/admin') //when admin logins navigate to admin dashboard
            }
            
          },
          error:(reason:any)=>{
            alert(reason.error)
          }
        })
      }
    }

}
