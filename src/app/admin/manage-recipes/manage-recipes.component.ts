import { Component } from '@angular/core';
import { recipeModel } from '../Model/recipeModel';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrl: './manage-recipes.component.css'
})
export class ManageRecipesComponent {
//ppty
  recipeDetails:recipeModel={ 
    cuisine: "",
    difficulty: "" //set this to any empty string for the default placeholder of cuisine type & difficulty type dropdownmenu
  }as recipeModel;

  ingredients:any=[]
  instructions:any=[]
  mealType:any=[]




  //for edit recipe
  isEditMode=false;
  recipeId:string |null=null;

  //Dependency Injection
  constructor(private api:ApiService,private router:Router,private route:ActivatedRoute){} //injected activated route for edit recipe to identify id is there in url 

  //edit recipe
    ngOnInit() {
  // Check if there is an ID in the URL,if its null,we are in "add" mode
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {//if id present in url
      this.isEditMode = true; //then edit mode becomes true
      this.fetchRecipeData(this.recipeId);//then only fetch existing recipe data in the form by specific recipeid
    }
  }


  //
  fetchRecipeData(id: string) { //fetching data to each input field,it populates the form automatically via [(ngModel)]
    this.api.getArecipeAPI(id).subscribe((res: any) => {
      // Map the fetched data back to your local variables in input field of the form
      this.recipeDetails = res;
      this.ingredients = res.ingredients || [];
      this.instructions = res.instructions || [];
      this.mealType = res.mealType || [];
    });
  }






  //mtd
  addIngredients(value:string){
    this.ingredients.push(value)
  }

  removeIngredients(value:string){
    this.ingredients=this.ingredients.filter((item:string)=>item!=value)
  }


  addInstructions(value:string){
    this.instructions.push(value)
  }

   removeInstructions(value:string){
    this.instructions=this.instructions.filter((item:string)=>item!=value)
  }



//in form showing mealtype while selecting checkbox....ie....choose meal-type:dinner lunch
  mealTypeSelect(checkevent:any){
    
    if(checkevent.target.checked){ //using checkevent variable check value in checkbox,here get value by .checked   ,cond when clicked the checkbox
         !this.mealType.includes(checkevent.target.name)  &&  this.mealType.push(checkevent.target.name)
      
      
    }else{
      this.mealType=this.mealType.filter((item:string)=>item!=checkevent.target.name) //condn when deselect the checkbox,filter mealtype..that deselected  item(lunch/dinner/breakfst).and store remins selected item in mealtype
    }
   
  }


//both addRecipe and editRecipe function to fetch/post data from body of add/edit recipedetails form
   submitRecipe(){
    this.recipeDetails.ingredients=this.ingredients //these 3 array passed inside recipedetails=recipemodel to store objects in array,bec of array only this mtd
    this.recipeDetails.instructions=this.instructions
    this.recipeDetails.mealType=this.mealType

  //extract values for validation
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,
          caloriesPerServing,image,mealType}=this.recipeDetails
         //validation logic
          if (name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty &&
             cuisine && caloriesPerServing && image && mealType!.length>0) {//check from is empty or not


              if (this.isEditMode && this.recipeId) {
              // --- EDIT/UPDATE LOGIC ---(put mtd)
                     this.api.EditArecipeAPI(this.recipeId, this.recipeDetails).subscribe({
                              next: (res: any) => {
                              alert("Recipe updated successfully!");
                                   this.router.navigateByUrl('/admin/all-recipes');
                               },
                              error: (reason: any) => {
                              alert(reason.error);
                               }
                       });
               } else {
             // --- ADD NEW recipe LOGIC ---(post mtd)

                this.api.addRecipeAPI(this.recipeDetails).subscribe({
                  next:(res:any)=>{
                    alert("recipe added successfully")
                    this.router.navigateByUrl("/admin/all-recipes");
              // resetting form data after successful addition
                    this.recipeDetails={}
                    this.ingredients=[]
                    this.instructions=[]
                    this.mealType=[]
                  },
                  error:(reason:any)=>{
                    alert(reason.error)
                  
                  }
                })
              }
          }else{
            alert("please fill the form completely")
          }
   }


}
