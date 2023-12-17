import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  data$!: any[];
  itemsCart: any = [];
  cartNumber: number = 0;

  productArray: any = [
    {
      productId: 1,
      img: "../../../assets/images/product-1 - Copie.jpg",
      amt: 400,
      qnt: 1
    },
    {
      productId: 2,
      img: "../../../assets/images/product-2.jpg",
      amt: 500,
      qnt: 1
    },
    {
      productId: 3,
      img: "../../../assets/images/product-3.jpg",
      amt: 700,
      qnt: 1
    },
    {
      productId: 4,
      img: "../../../assets/images/product-4.jpg",
      amt: 900,
      qnt: 1
    }
  ];

  constructor(
    private _cartService: CartService
    ) { }

  ngOnInit(): void {
    this.getDataAll();
  }

  getDataAll() {
    this._cartService.getDatas().subscribe(
      (resp: any) => {
        this.data$ = resp.data;
        console.log(this.data$)
      },
      (_err: any) => {
        console.log("Erreur lors de la récupération des catégories !", _err);
      }
    );
  }

  inc(prod: any) {
    if (prod.qnt != 5) {
      prod.qnt += 1;
    }
  }

  dec(prod: any) {
    if (prod.qnt != 1) {
      prod.qnt -= 1;
    }
  }
  
  addToCart(prod: any) {
    let cartDataNull = localStorage.getItem('localCart');

    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(prod);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id = prod.id;
      let index: number = -1;
      const localCartString = localStorage.getItem('localCart');
      this.itemsCart = localCartString ? JSON.parse(localCartString) : null;
      console.log(localCartString);

      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].productId)) {
          // this.itemsCart[i].qnt = prod.qnt;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(prod);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

  cartNumberFunc() {
    const localCartString = localStorage.getItem('localCart');
    var cartValue = localCartString ? JSON.parse(localCartString) : null;
    this.cartNumber = cartValue.length;
    this._cartService.cartSubject.next(this.cartNumber);
  }

  getImageUrl(photo: string): string {
    const image = environment.image_url + '/' + photo;
    return image;
  }
}
