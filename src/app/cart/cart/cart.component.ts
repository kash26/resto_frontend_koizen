import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  getCartDetails: any = [];
  total: number = 0;
  cartNumber: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails();
    this.loadCart();
  }

  cartDetails() {
    const localCartString = localStorage.getItem('localCart');
    var cartValue = localCartString ? JSON.parse(localCartString) : null;

    if (localCartString) {
      this.getCartDetails = localCartString ? JSON.parse(localCartString) : null;
    }
  }

  incQnt(prodId: any, qnt: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].productId === prodId) {
        if (qnt != 5) this.getCartDetails[i].qnt = parseInt(qnt) + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  decQnt(prodId: any, qnt: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].productId === prodId) {
        if (qnt != 1) this.getCartDetails[i].qnt = parseInt(qnt) - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  loadCart() {
    const localCartString = localStorage.getItem('localCart');

    if (localCartString) {
      this.getCartDetails = localCartString ? JSON.parse(localCartString) : null;
      this.total = this.getCartDetails.reduce(function(acc: any, val: any) {
        // return acc + (val.amt * val.qnt);
        // console.log("ACC: ", acc);
        // console.log("VAL: ", val.attributes.price);
        return parseInt(acc) + parseInt(val.attributes.price);
      }, 0);
    }
  }

  delete(id: any) {
    console.log(id);
    const localCartString = localStorage.getItem('localCart');

    if (localCartString) {
      this.getCartDetails = localCartString ? JSON.parse(localCartString) : null;
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].id === id) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
  }

  checkout() {
    console.log(this.getCartDetails);
  }

  cartNumberFunc() {
    const localCartString = localStorage.getItem('localCart');
    var cartValue = localCartString ? JSON.parse(localCartString) : null;
    this.cartNumber = cartValue.length;
    this._cartService.cartSubject.next(this.cartNumber);
  }

  removeAll() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    // this.loadCart();
    this.total = 0;
    this.cartNumber = 0;
    this._cartService.cartSubject.next(this.cartNumber);
  }

  getImageUrl(photo: string): string {
    const image = environment.image_url + '/' + photo;
    return image;
  }
}
