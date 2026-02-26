import { Component } from '@angular/core'; 
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../service/api.service';
import  {FormsModule} from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [HeaderComponent,FormsModule,SearchPipe,NgxPaginationModule],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css'
})
export class RecipiesComponent {

  //ppty
  allRecipes: any = []
  
  dummyRecipes:any=[]

  searchkey:string=""

  p:number=1;  //for pagination...after loading page goes to 1

  //
  constructor(private api: ApiService,private router:Router) { }    // for use of api call injected api file from service

  //hook used to load data in dom
  ngOnInit() {
    this.getAllRecipes()
  }



//api called here

  getAllRecipes() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      this.allRecipes = res     //here not used slice (limit data to desired number) bec here need all data items to view
      this.dummyRecipes=this.allRecipes
      console.log(this.allRecipes); 

    })
  }

// for filtering recipe on mealtype and cuisine type
filterRecipes(key:string,value:string){
  this.allRecipes=this.dummyRecipes.filter((item:any)=>item[key].includes(value))
}


// image on (click) fn to goto view recipe pg for clicked recipe content in detail
viewRecipe(recipeId:string){ //recipe original id is stored to (recipeId)
  if(sessionStorage.getItem("token")){//token is there (ie,islogined only use this feature...to view each reacipe by clicking img on all-recipes)
    this.router.navigateByUrl(`view/${recipeId}/recipies`)
  }else{
    alert("please login to explore our recipes...")
  }

}


}
