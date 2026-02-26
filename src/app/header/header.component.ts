import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  //ppty
  isLoggedin: boolean = false
  loginUsername: string = "" //DATA GET FROM FRONTEND

// dependency injection of ROUTER
  constructor(private router:Router){}

//user name displaying

  ngOnInit() {      // for rendering we use angular lifecycle hooks ngOnInit
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) { //after login token and user is stored in sessionStorage(ie, frontend)
      this.isLoggedin = true  //token is get ,then true
      // here we use JSON.parse to get data from object(during data passed as object by JSON.stringify)
      this.loginUsername = JSON.parse(sessionStorage.getItem("user") || " ").name.split(" ")[0] //Here 2 arguements are passed   1.user name is get from user(stored existing user data in login.ts,or jst inspect after login you can see in appliction...)..if long name spliy it and take [o value..ie, firstname only] ||(or)   2.make as empty string(value is not there)
    } else {
      this.isLoggedin = false //no token get
      this.loginUsername = " " // no usrname get
    }
  }


//logout button

logOut(){
  sessionStorage.clear()
    this.loginUsername=" "
    this.isLoggedin=false
    this.router.navigateByUrl("/")
  
}





}



