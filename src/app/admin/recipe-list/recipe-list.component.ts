import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  //ppty

  allRecipes:any=[]

  SearchKey:string=""// for using search pipe to implement search,but we alread implemented searchpipe in all-recipe pg in userpg
  // so import formsModule for using ngModel in html side,but here no spce to import bec. of admin module
  //so only we have to import FormsModue in admin.module.ts file and search pipe also import
  


  constructor(private api:ApiService){}


  ngOnInit(){

    this.getAllRecipes()
    

  }


  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes=res
      console.log(this.allRecipes);
      
    })
  }



  deleteRecipes(id:string){
    this.api.deleteRecipeAPI(id).subscribe((res:any)=>{
      alert("recipe deleted successfully")
      this.getAllRecipes() //to load all remain recipes
    })
  }

}
