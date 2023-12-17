import { UpdateDishComponent } from './dish/update-dish/update-dish.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RestoRoutingModule } from './resto-routing.module';
import { HomeComponent } from './home/home.component';
import { OriginComponent } from './origin/origin.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { OriginFormComponent } from './origin/origin-form/origin-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { OriginUpdateComponent } from './origin/origin-update/origin-update.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { LoaderComponent } from './components/loader/loader.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AddIngredientComponent } from './ingredient/add-ingredient/add-ingredient.component';
import { UpdateIngredientComponent } from './ingredient/update-ingredient/update-ingredient.component';
import { TableComponent } from './table/table.component';
import { AddTableComponent } from './table/add-table/add-table.component';
import { UpdateTableComponent } from './table/update-table/update-table.component';
import { DishComponent } from './dish/dish.component';
import { AddDishComponent } from './dish/add-dish/add-dish.component';
import { OrderComponent } from './order/order.component';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { ToastrModule } from 'ngx-toastr';
import { ReversePipe } from '../reverse.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    OriginComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    OriginFormComponent,
    DashboardComponent,
    CategoryComponent,
    OriginUpdateComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    LoaderComponent,
    IngredientComponent,
    AddIngredientComponent,
    UpdateIngredientComponent,
    TableComponent,
    AddTableComponent,
    UpdateTableComponent,
    DishComponent,
    AddDishComponent,
    UpdateDishComponent,
    OrderComponent,
    UpdateOrderComponent,
    AddOrderComponent,
    ReversePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RestoRoutingModule,
    FormsModule,
    ToastrModule
  ],
})
export class RestoModule { }
