import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from './dish.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent {
  datas$!: any[];
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';
  image!: any;

  constructor (
    private toastr: ToastrService,
    private _service: DishService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDataList();
  }

  getImage(path: any) {
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

  delete(event: any, ingredientId: any) {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer ce plat ?')) {
      event.target.innerText = "Suppresion...";

      this._service.delete(ingredientId)
        .subscribe((res: any) => {
          this.getDataList();
          this.toastr.success('Plat supprimé avec succès.!', 'Suppression!');
        })
    }
  } 

  addItem() {
    this._router.navigate(['admin/add-dish']);
  }

  getImageUrl(photo: string): string {
    const image = environment.image_url + '/' + photo;
    return image;
  }
}
