import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PlacementComponent } from './placement/placement.component';
import { FeeComponent } from './fee/fee.component';
import { AdminComponent } from './admin/admin.component';

import { GenerateidComponent } from './generateid/generateid.component';
import { BranchComponent } from './branch/branch.component';
import { FormsModule } from '@angular/forms';
import { CommonComponent } from './common/common.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './search.pipe';




@NgModule({
  declarations: [PlacementComponent, FeeComponent, AdminComponent,  GenerateidComponent, BranchComponent, CommonComponent, SearchPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
