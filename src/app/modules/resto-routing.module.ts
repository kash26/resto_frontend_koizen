import { UpdateTableComponent } from './table/update-table/update-table.component';
import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OriginComponent } from './origin/origin.component';
import { HomeComponent } from './home/home.component';
import { OriginFormComponent } from './origin/origin-form/origin-form.component';
import { OriginUpdateComponent } from './origin/origin-update/origin-update.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AddIngredientComponent } from './ingredient/add-ingredient/add-ingredient.component';
import { UpdateIngredientComponent } from './ingredient/update-ingredient/update-ingredient.component';
import { TableComponent } from './table/table.component';
import { AddTableComponent } from './table/add-table/add-table.component';
import { DishComponent } from './dish/dish.component';
import { AddDishComponent } from './dish/add-dish/add-dish.component';
import { UpdateDishComponent } from './dish/update-dish/update-dish.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { UpdateOrderComponent } from './order/update-order/update-order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: "Dashboard"
      },
      {
        path: 'origin',
        component: OriginComponent,
        title: "Origin",
      },
      {
        path: 'add-origin',
        component: OriginFormComponent,
      },
      {
        path: 'update-origin/:id',
        component: OriginUpdateComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
        title: "Category"
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'update-category/:id',
        component: UpdateCategoryComponent,
      },
      {
        path: 'ingredient',
        component: IngredientComponent,
        title: "Ingredient"
      },
      {
        path: 'add-ingredient',
        component: AddIngredientComponent,
      },
      {
        path: 'update-ingredient/:id',
        component: UpdateIngredientComponent,
      },
      {
        path: 'table',
        component: TableComponent,
        title: "Ingredient"
      },
      {
        path: 'add-table',
        component: AddTableComponent,
      },
      {
        path: 'update-table/:id',
        component: UpdateTableComponent,
      },
      {
        path: 'dish',
        component: DishComponent,
        title: "Dish"
      },
      {
        path: 'add-dish',
        component: AddDishComponent,
      },
      {
        path: 'update-dish/:id',
        component: UpdateDishComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
        title: "Dish"
      },
      {
        path: 'add-order',
        component: AddOrderComponent
      },
      {
        path: 'update-order/:id',
        component: UpdateOrderComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestoRoutingModule { }
