import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem : number = 0;
  public searchTerm!: string;
  cartItem: number = 0;

  constructor(private _cartService : CartService) { }

  // ngOnInit(): void {
  //   this.cartService.getProducts()
  //   .subscribe(res=>{
  //     // console.log(res);
  //     this.totalItem = res.length;
  //   })
  // }
  // search(event:any){
  //   this.searchTerm = (event.target as HTMLInputElement).value;
  //   console.log(this.searchTerm);
  //   this.cartService.search.next(this.searchTerm);
  // }

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
