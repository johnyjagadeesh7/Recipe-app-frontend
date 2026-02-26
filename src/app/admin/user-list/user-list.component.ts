import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { log } from 'console';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  // ppty to store userslist
  allUsers:any=[]

  constructor(private api:ApiService){}


   ngOnInit(){

    this.getAllUsers()

   }


  // mtds

  getAllUsers(){
    this.api.allUsersListAPI().subscribe((res:any)=>{
      this.allUsers=res
      console.log(this.allUsers);
      
    })
  }

}
