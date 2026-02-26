import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';
import { UserListComponent } from './user-list/user-list.component';
import { DownloadComponent } from './download/download.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [

  //here we connects all component of admin 

  //http://localhost:4200/admin
  {
    path:"",component:DashboardComponent
  },
    //http://localhost:4200/admin/all-recipes
  {
    path:"all-recipes",component:RecipeListComponent
  },

  //here we use same component :ManageRecipes to handle dynamically for edit and add recipedetails through form
    //http://localhost:4200/admin/recipes/add
  {
    path:"recipes/add",component:ManageRecipesComponent
  },
   //http://localhost:4200/admin/recipes/edit/:id
  {
    path:"recipes/edit/:id",component:ManageRecipesComponent
  },


    //http://localhost:4200/admin/all-users
  {
    path:"all-users",component:UserListComponent
  },
    //http://localhost:4200/admin/all-downloads
  {
    path:"all-downloads",component:DownloadComponent
  },
    //http://localhost:4200/admin/all-request
  {
    path:"all-request",component:RequestComponent
  },
  
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
