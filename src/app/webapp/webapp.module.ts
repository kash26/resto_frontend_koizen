import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebappRoutingModule } from './webapp-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './home/home.component';
import { WebloaderComponent } from './webloader/webloader.component';
import { FooterComponent } from './components/footer/footer.component';
// import { ReversePipe } from '../reverse.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    HomeComponent,
    WebloaderComponent,
    FooterComponent,
    // ReversePipe
  ],
  imports: [
    CommonModule,
    WebappRoutingModule
  ]
})
export class WebappModule { }
