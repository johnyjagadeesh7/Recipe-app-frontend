import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject,Injectable,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';//for deploy website


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  //deploy on vercel
  private server_url = environment.apiUrl; //this will switch to render url on vercel



  //dependency injection by constructor....we have to inject httpclient
  constructor(@Inject(PLATFORM_ID) private platformId:object, private http: HttpClient) { }

  // Api call to server url for local use(backend url)
  // server_url = "http://localhost:4000".....need this before deploying in versel







  //writing API for allrecipes and this is used in every  component.ts for api call
  // also use for get allrecipes in admin side
  getAllRecipeAPI() {
    return this.http.get(`${this.server_url}/all-recipies`)
  }


  // writing API for client testmonials,here used post so arguement is there (reqBody:any)
  addTestimonyAPI(reqBody:any) {
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)

  }

  
  // writing API for User-register,here used post so arguement is there (reqBody:any)
  registerAPI(reqBody:any) {
    return this.http.post(`${this.server_url}/register`,reqBody)

  }

  
  // writing API for user-login,here used post so arguement is there (reqBody:any)
  loginAPI(reqBody:any) {
    return this.http.post(`${this.server_url}/login`,reqBody)

  }

  

  // appendToken()-req header(using append mtd)
  appendToken(){
    //newly edit for deployement error in sessionstorage
    let headers= new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers = headers.append("Authorization",`Bearer ${token}`);
      }
    }
    return headers;
  } 

  //writing API for getArecipe

  getArecipeAPI(id:string){
    return this.http.get(`${this.server_url}/view/${id}/recipies`,{headers:this.appendToken()}) //here we need token
  }


  //writing API for getRelatedRecipe

  getRelatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,{headers:this.appendToken()}) //here also need to take token
  }


  
  //writing API for downloadRecipeAPI

   downloadRecipeAPI(id:string,recipeDetails:any){
    return this.http.post(`${this.server_url}/downloads/${id}`,recipeDetails,{headers:this.appendToken()}) //here also need to take token
  }



 //writing API for saveRecipeAPI

   saveRecipeAPI(recipeDetails:any){ //in arguement here not use of id passing bec id,name,cusine,image are taken from body
    return this.http.post(`${this.server_url}/recipe/save`,recipeDetails,{headers:this.appendToken()}) //here also need to take token
  }

  
  
  //writing API for getsaved-RecipeAPI.....to view saved recipes in saved-recipe webpg
    
    getsavedRecipesAPI(){
    return this.http.get(`${this.server_url}/saved-recipes`,{headers:this.appendToken()})
    }

  //writing API for removeSavedRecipes.....to view saved recipes in saved-recipe webpg
    
    removeSavedRecipesAPI(id:any){
    return this.http.delete(`${this.server_url}/recipe/${id}/remove`,{headers:this.appendToken()}) //here arguement is there id
    }





    
  //  Adminside


   // writing API for client testmonials,for getting data to admin side for approve and reject testimonials

     getAllTestimonyAPI(){
      return this.http.get(`${this.server_url}/all-testimonials`) //here no need of token bec,these can view without login user
     }


    
   // writing API for client testmonials,while click approve button .....for getting admin side for view that testimonial is approved in under status

     updateStatusAPI(id:string,status:string){
      return this.http.get(`${this.server_url}/all-testimonials/${id}?status=${status}`,{headers:this.appendToken()}) 
     }



   // writing API for view downloads recipes by user,.....for  admin to konw which recipe is downloaded most and how much times a recipe donloaded
    allDownloadListAPI(){
      return this.http.get(`${this.server_url}/all-downloads`,{headers:this.appendToken()}) 
     }


     // writing API for alluserslist view ,.....for  admin to know login users and their email id
    allUsersListAPI(){
      return this.http.get(`${this.server_url}/all-users`,{headers:this.appendToken()}) 
     }


     // writing API for allrecipe list in admin side to view,edit,delete,add more recipes.
     //here we not need to write api,its already written above..as "allrecipes"..same for this to get recipes




     //writing API for add recipe through recipe details from admin side
     addRecipeAPI(RecipeDetails:any){
       return this.http.post(`${this.server_url}/recipes/add`,RecipeDetails,{headers:this.appendToken()})
     }


    //writing API for delete recipe through recipe details form, from admin side
     deleteRecipeAPI(id:string){
       return this.http.delete(`${this.server_url}/recipes/${id}/delete`,{headers:this.appendToken()})
     }



    //writing API for getArecipe...for fetchdata to edit recipe detail form....already done api above
    //writing api for editArecipe....through recipe details form, from adminside
      EditArecipeAPI(id:string,RecipeDetails:any){
          return this.http.put(`${this.server_url}/recipes/edit/${id}`,RecipeDetails,{headers:this.appendToken()}) //here we need token
    }









}