import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {

  //here we made for feedback list

  allTestimony:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllTestimony()
  }

  getAllTestimony(){
  this.api.getAllTestimonyAPI().subscribe((res:any)=>{

    this.allTestimony=res
    console.log(this.allTestimony);
    

  })
}


//updateStatus

updateStatus(id:string,status:string){ //need ti pass id and status...already id passed from params remains only status from admin
  this.api.updateStatusAPI(id,status).subscribe((res:any)=>{
    this.getAllTestimony()
  })
}

}
