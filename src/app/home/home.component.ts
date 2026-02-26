import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //ppty to store ,each fn data
  allRecipes:any=[]
  allTestimonials:any=[]



       constructor(private api:ApiService){}  // for use of api call injected api file from service

       //hook used to load data in dom and display
       ngOnInit(){
       this.getHomeRecipes()
       this.getAllTestimony()

       }


//mtds



      //  api called here    

       getHomeRecipes(){
        this.api.getAllRecipeAPI().subscribe((res:any)=>{
          this.allRecipes=res.slice(0,6)   //slice is used to limit data to desired number
          console.log(this.allRecipes);

        })
       }


       //need to display client testimonials,without login user... so we not append token with this api "getAllTestimony"
       getAllTestimony(){
        this.api.getAllTestimonyAPI().subscribe((res:any)=>{
          this.allTestimonials=res.filter((item:any)=>item.status=='Approved') //here we used filter to show only approved client messages
          console.log(this.allTestimonials);
          
        })
       }
}
