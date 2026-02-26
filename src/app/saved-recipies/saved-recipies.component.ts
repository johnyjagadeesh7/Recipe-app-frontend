import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { log } from 'node:console';

@Component({
  selector: 'app-saved-recipies',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './saved-recipies.component.html',
  styleUrl: './saved-recipies.component.css'
})
export class SavedRecipiesComponent {
  allRecipes:any=[]  //for getting all saved recipes in this array of specific userid

  constructor(private api:ApiService){}

ngOnInit(){        //for display content in getAllSavedRecipes
  this.getAllSavedRecipes()
}

// api call for geting all savedrecipes
  getAllSavedRecipes(){
    this.api.getsavedRecipesAPI().subscribe(res=>{ //api called
      this.allRecipes=res
      console.log(this.allRecipes); //all saved recipes....in "allRecipes"

      //o/p have to check console of saved recipe and inspect there will be any array(1) ,which  means user saved 1 recipe will be there to view
  })
  }


  //api call for delete a singe recipe from savedRecipes
  removeRecipe(id:any){
    this.api.removeSavedRecipesAPI(id).subscribe(res=>{
      alert("recipe deleted")
    
      this.getAllSavedRecipes() //to get remaining saved recipes after deleting
      
    })
  }



}
