import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlacementsComponent } from './placements/placements.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';


const routes: Routes = [{path:'login',component:LoginComponent},
                        {path:'placements',component:PlacementsComponent},
                        {path:'facilities',component:FacilitiesComponent},
                        {path:'',redirectTo:'home',pathMatch:'full'},
                        {path:'home',component:HomeComponent},
                        {path:'aboutus',component:AboutusComponent},
                        {path:'contactus',component:ContactusComponent},
                    ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
