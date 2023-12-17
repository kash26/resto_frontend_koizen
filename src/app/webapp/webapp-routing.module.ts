import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
        title: "Home",
        pathMatch: 'full'
      },
      {
        path: 'cart',
        component: CartComponent,
        title: "Cart"
      },
      {
        path: ':table',
        component: ProductsComponent,
        data: { paramName: 'table' }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebappRoutingModule { }
