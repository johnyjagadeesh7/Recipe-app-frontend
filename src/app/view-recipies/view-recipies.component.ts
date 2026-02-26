import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';



@Component({
  selector: 'app-view-recipies',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-recipies.component.html',
  styleUrl: './view-recipies.component.css'
})
export class ViewRecipiesComponent {

  id: string = ""
  recipe: any = {}

  allRelatedRecipe: any = []

  // injected dependencies api and ActivatedRoute from routerLink(used for params to take token from backend,in backend by suing params we pass token to recipe.controller.js)
  constructor(private api: ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {  //data will show after pg loading so use ngOnInit
    this.activateRoute.params.subscribe((res: any) => {
      this.id = res.id  //taken id of that recipe
      //  console.log(this.id);
      this.getRecipe(this.id)

    })
  }


  getRecipe(id: string) {
    this.api.getArecipeAPI(id).subscribe((res: any) => {  //here we called api and here call back is used,not object
      this.recipe = res
      console.log(this.recipe);

      //BELOW DEFINED FUNCT CALLED
      this.getRelatedRecipes(res.cuisine)
    })
  }
  //  o/p of console(view recipe)
  // id of recipe which we clicked from all recipe and array of dat of that recipe is shown in console





  getRelatedRecipes(cuisine: string) {
    this.api.getRelatedRecipeAPI(cuisine).subscribe((res: any) => {
      if (res.length > 1) { //if cuisine type having recipe more than one(ie more than selected recipe)
        this.allRelatedRecipe = res.filter((item: any) => item.name != this.recipe.name) // not shown the selected recipe in related recipes 
        console.log(this.allRelatedRecipe);

      }
    })
  }



  addDownloadRecipe() { //while clicking button on view-recipe pg download the recipe content as pdf
    const recipeDetails = {
      name: this.recipe.name,
      cuisine: this.recipe.cuisine
    }
    this.api.downloadRecipeAPI(this.id, recipeDetails).subscribe((res: any) => {
      console.log(res);
      alert("recipe downloaded")

      this.generatePDF() //called generatePDF() to generate pdf
    })
  }



  generatePDF() { // function to setup pdf and genarate it by install thirdparty lib "jspdf" ...and installed "jspdf-autotable"  for making table contents

    let pdf = new jsPDF()
    //heading
    pdf.setFontSize(16)
    pdf.setTextColor('red')
    pdf.text(this.recipe.name, 10, 10)
    //contents
    pdf.setFontSize(12)
    pdf.setTextColor('black')
    pdf.text(`Cuisine : ${this.recipe.cuisine}`, 10, 20) //take corresponding data from "recipe(database collection name)"
    pdf.text(`Servings : ${this.recipe.servings}`, 10, 25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`, 10, 30)
    pdf.text(`Total preparationTime : ${this.recipe.prepTimeMinutes}`, 10, 35)
    pdf.text(`Total CookTime : ${this.recipe.cookTimeMinutes}`, 10, 40)
    pdf.text(`Total calorie : ${this.recipe.caloriesPerServing}`, 10, 45)
    //ingredient,instructions
    let head =[["Ingredients Needed","Cooking Instructions"]] //headers of a table content
    let body:any=[]
    body.push([this.recipe.ingredients,this.recipe.instructions]) //here we created an empty array and we use "push" mtd to add data to array within its corresponding headers

    autoTable(pdf,{head,body,startY:50}) //using ppty of jspdf "autotable" to setup like table contents

    pdf.output('dataurlnewwindow') //dwnld pdf should open in a new window for viewing
    pdf.save('recipe.pdf') // the names comes after downlds pdf

  }




  // save recipe function ,in which a user can save a recipe and can view in saved-recipes

  saveRecipe(){
    const{_id,name,cuisine,image}=this .recipe
    this.api.saveRecipeAPI({id:_id,name,cuisine,image}).subscribe({
      next:(res:any)=>{
        alert("Recipe added to your saved collection")
      },
      error:(reason:any)=>{
           alert(reason.error)
       },
         //here we made request to backend
    })
  }


}
