import { CategoryService } from './../../../modules/category/category.service';
import { Component, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy  {
  data$!: any[];
  itemsCart: any = [];
  cartNumber: number = 0;

  datas$!: any[];
  categories: any[] = [];
  table: any;
  itemPrice: number = 0;
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';  
  selectedCategoryId: number | null = null; // Nouvelle variable pour stocker l'ID de la catégorie sélectionnée

  constructor (
    private toastr: ToastrService,
    private _service: ProductService,
    private _cartService: CartService,
    private _catService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDataList();
    // this.getDataList2();
    this.getCategories();
    // this.getDataAll();
    this.getTableId();
  }

  getTableId() {
    this.table = this._route.snapshot.paramMap.get('table');
    
    if (this.table) {
      // console.log(this.table);
      localStorage.setItem('table', this.table);
    } else {
      localStorage.setItem('table', "2");
    }
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

  // Old Version
  ngOnDestroy(): void {
    const total = "totalPrice";
    const totalPrice = this.getItem("totalPrice");
    if (totalPrice && !this.itemPrice) {
      this.setItem(total, totalPrice);
    }
    if (this.itemPrice && !totalPrice) {
      this.setItem(total, this.itemPrice);
    }
    if (totalPrice && this.itemPrice) {
      const newTotal = totalPrice + this.itemPrice;
      this.setItem(total, newTotal);
    }
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // getDataList() {
  //   this._service.getDatas().subscribe(
  //     (resp: any) => {
  //       this.data$ = resp.data.filter((item: any) => {
  //         if (this.selectedCategoryId === null) {
  //           return true; // Afficher tous les produits si aucune catégorie n'est sélectionnée
  //         } else {
  //           // return item.category_id === this.selectedCategoryId; // Filtrer les produits par catégorie
  //           // console.log(item.relationships.category_id == this.selectedCategoryId);
  //           return item.relationships.category_id == this.selectedCategoryId; // Filtrer les produits par catégorie
  //         }
  //       });
  //       this.isLoading = false;
  //     },
  //     (_err: any) => {
  //       // this.isLoading = false;
  //       console.log("Erreur lors de l'enregistrement !");
  //     }
  //   );
  // }

  getDataList() {
    this._service.getDatas().subscribe(
      (resp: any) => {
        this.data$ = resp.data.filter((item: any) => {
          if (this.selectedCategoryId === null) {
            return item.attributes.is_visible == 1; // Afficher tous les produits visibles si aucune catégorie n'est sélectionnée
          } else {
            return (
              item.relationships.category_id == this.selectedCategoryId &&
              item.attributes.is_visible == 1 // Filtrer les produits par catégorie et par visibilité
            );
          }
        });
        this.isLoading = false;
      },
      (_err: any) => {
        // this.isLoading = false;
        console.log("Erreur lors de l'enregistrement !");
      }
    );
  }

  getCategories() {
    this._catService.getDatas().subscribe(
      (resp: any) => {
        // Filter categories where is_visible is 1
        this.categories = resp.data.filter((category: any) => category.attributes.is_visible == 1);
        // console.log(this.categories);
      },
      (_err: any) => {
        console.log("Erreur lors de la récupération des catégories !");
      }
    );
  }  

  filterByCategory(categoryId: number) {
    this.loadingTitle = "Chargement..."
    this.isLoading = true;
    this.selectedCategoryId = categoryId;
    this.getDataList();
  }

  resetFilter() {
    this.loadingTitle = "Chargement..."
    this.isLoading = true;
    this.selectedCategoryId = null;
    this.getDataList();
  }

  getDataList2() {
    this._service.getDatas().subscribe(
      (resp: any) => {
        this.datas$ = resp.data;
        // console.log(this.datas$);
        const categoryIds = this.datas$.map(item => item.relationships.category_id);
        // console.log(categoryIds);
        this.isLoading = false;
      },
      (_err: any) => {
        console.log("Erreur lors de l'enregistrement !");
      }
    );
  }

  addToCart_old(item: any){
    this.itemPrice += parseInt(item?.attributes.price);
    this._cartService.addtoCart(item, this.itemPrice);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getImageUrl(photo: string): string {
    const image = environment.image_url + '/' + photo;
    return image;
  }
}
