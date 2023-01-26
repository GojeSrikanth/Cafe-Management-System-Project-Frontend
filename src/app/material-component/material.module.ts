import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './dialog/product/product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ViewBillComponent,
    ViewBillProductsComponent,
    ManageUserComponent,
    ConfirmationComponent,
    
  ]
})
export class MaterialComponentsModule {}
