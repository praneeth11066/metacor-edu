import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PlacementComponent } from './placement/placement.component';
import { FeeComponent } from './fee/fee.component';

import { GenerateidComponent } from './generateid/generateid.component';
import { BranchComponent } from './branch/branch.component';
import { CommonComponent } from './common/common.component';




const routes: Routes = [{path:"admin",component:AdminComponent,
            children:[{path:"id",component:GenerateidComponent},
                      {path:'placement',component:PlacementComponent},
                      {path:'fee',component:FeeComponent},
                      {path:'',redirectTo:'Branch',pathMatch:'full'},
                     {path:'Branch',component:BranchComponent},
                     {path:'common',component:CommonComponent}
                     
                    
                      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
