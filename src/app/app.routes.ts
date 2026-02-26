import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewRecipiesComponent } from './view-recipies/view-recipies.component';
import { SavedRecipiesComponent } from './saved-recipies/saved-recipies.component';
import { authGuard } from './guard/auth.guard';
import { PnfComponent } from './pnf/pnf.component';

export const routes: Routes = [
    // admin path setting by using "lazy loading"(same steps for all project)
    {//at last of project we used canActivate these routes for protection by angular guards
        path:"admin",canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },




    //client paths
    {path:"",component:HomeComponent},
    {path:"all-recipies",component:RecipiesComponent},
    {path:"contact",component:ContactComponent},
    {path:"about",component:AboutComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"view/:id/recipies",canActivate:[authGuard],component:ViewRecipiesComponent},
    {path:"saved-recipies",canActivate:[authGuard],component:SavedRecipiesComponent},

    //for pnf
    {path:"**",component:PnfComponent},
   

];
