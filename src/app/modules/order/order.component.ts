import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OrderService } from './order.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  datas$!: any[];
  isLoading: boolean = false;
  loadingTitle: string = 'Loading...';

  constructor (
    private toastr: ToastrService,
    private _service: OrderService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDataList();
  }

  getImage(path: any) {
    console.log(environment.image_url + '/storage/' + path);
    return  environment.image_url + '/storage/' + path;
  }

  getDataList() {
    this._service.getDatas().subscribe(
      (resp: any) => {
        this.datas$ = resp.data;
        console.log(this.datas$);
        this.isLoading = false;
      },
      (_err: any) => {
        console.log("Erreur lors de l'enregistrement !");
      }
    );
  }

  calculateTotalPrice(dishes: any[]): number {
    let totalPrice = 0;
    dishes.forEach(item => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice;
  }

  // deleteItem(event: any, categoryId: any) {
  //   if (confirm('Are you sure you want to delete this data ?')) {
  //     event.target.innerText = "Deleting...";

  //     this._service.delete(categoryId)
  //       .subscribe((res: any) => {
  //         this.getDataList();
  //         alert("Dish deleted successfully.");
  //       })
  //   }
  // } 

  delete(event: any, ingredientId: any) {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer cette commande ?')) {
      event.target.innerText = "Suppresion...";

      this._service.delete(ingredientId)
        .subscribe((res: any) => {
          this.getDataList();
          this.toastr.success('Commande supprimée avec succès.!', 'Suppression!');
          // alert("Catégorie supprimée avec succès.");
        })
    }
  } 

  addItem() {
    this._router.navigate(['admin/add-order']);
    // this._router.navigate(['admin/add-origin']);
  }
}
