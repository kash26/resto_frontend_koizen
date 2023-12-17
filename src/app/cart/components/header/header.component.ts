import { Component } from '@angular/core';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItem: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.cartSubject.subscribe(
      (data: any) => {
        this.cartItem = data;
      }
    );
    this.cartItemFunc();
  }

  cartItemFunc() {
    if (localStorage.getItem('localCart')) {
      const localCartString = localStorage.getItem('localCart');
      var cartCount = localCartString ? JSON.parse(localCartString) : null;
      this.cartItem = cartCount.length;
    }
  }
}
