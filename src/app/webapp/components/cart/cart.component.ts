import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  getCartDetails: any = [];
  total: number = 0;
  cartNumber: number = 0;

  public products : any = [];
  public grandTotal !: number;
  public totalPrice !: number;
  loadingTitle: string = 'Commande en cours...';  
  isLoading: boolean = false;
  table!: any;
  ids: number[] = [];

  constructor(private toastr: ToastrService, private _service : CartService, private _router: Router,) { }

  ngOnInit(): void {
    this.cartDetails();
    this.loadCart();

    this._service.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this._service.getTotalPrice();
      // console.log(this.products[0].attributes.price);
    });
    this.calculateTotalPrice(this.products);
    this.totalPrice = this.getItem("totalPrice");
    if (!this.totalPrice) {
    }
    this.table = localStorage.getItem('table');
    if (this.table) {
      console.log(this.table);
      // localStorage.removeItem('table');
    } else {
      console.log("Table not exists");
    }
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

  // checkout() {
  //   console.log(this.getCartDetails);
  // }

  cartNumberFunc() {
    const localCartString = localStorage.getItem('localCart');
    var cartValue = localCartString ? JSON.parse(localCartString) : null;
    this.cartNumber = cartValue.length;
    this._service.cartSubject.next(this.cartNumber);
  }

  removeAll() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    // this.loadCart();
    this.total = 0;
    this.cartNumber = 0;
    this._service.cartSubject.next(this.cartNumber);
  }

  // getImageUrl(photo: string): string {
  //   const image = environment.image_url + '/' + photo;
  //   return image;
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('totalPrice');
  }

  // ngOnDestroy(): void {
  //   localStorage.removeItem('table');
  // }

  // Get item from localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(item: any){
    this.totalPrice = this.totalPrice - item.attributes.price;
    // console.log(item.attributes.price);
    // console.log(typeof item.price);
    console.log(this.totalPrice);
    // console.log(typeof item.totalPrice);
    this._service.removeCartItem(item);
  }
  emptycart(){
    this._service.removeAllCart();
  }

  calculateTotalPrice(dishes: any[]): number {
    // let totalPrice = 0;
    dishes.forEach(item => {
      this.totalPrice += parseInt(item?.attributes.price);
      // console.log(item);
    });
    console.log(this.totalPrice);
    return this.totalPrice;
  }

  checkout() {
    // for (const object of this.products) {
    //   this.ids.push(object.id);
    // }
    this.isLoading = true;
    for (const object of this.getCartDetails) {
      this.ids.push(object.id);
    }
    console.log(this.ids);

    const data = {
      table_id: this.table,
      dishes: this.ids
    };
    // console.log(data, 'entry');

    this._service.addData(data).subscribe({
      next: (res: any) => {
        // console.log(res, 'response');
        // console.log(res);
        localStorage.removeItem('totalPrice');
        this.isLoading = false;
        this.removeAll();
        this.toastr.success('Commande passée avec succés!', 'Commande!');
        this._router.navigateByUrl('/');
      },
      error: (err: any) => {
        // this.err = err.error.errors;
        console.log(err, 'errors');
        this.toastr.error('Une erreur est survenue lors de la commande!', 'Erreur!');
        // this._toastr.error('Une erreur s\'est produite lors de la création du plat.');
      }
    });
  }

  getImageUrl(photo: string): string {
    const image = environment.image_url + '/' + photo;
    return image;
  }
}
