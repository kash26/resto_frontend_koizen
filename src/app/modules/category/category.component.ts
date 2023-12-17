import { Component } from '@angular/core';
import { CategoryService } from './category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  datas$!: any[];
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  constructor (
    private toastr: ToastrService,
    private _service: CategoryService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDataList();
    
    // this.datas$ = this._service.datas$;
    // console.log(this.datas$);
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

  delete(event: any, originId: any) {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer cette catégorie ?')) {
      event.target.innerText = "Suppresion...";

      this._service.delete(originId)
        .subscribe((res: any) => {
          this.getDataList();
          this.toastr.success('Catégorie supprimée avec succès.!', 'Suppression!');
          // alert("Catégorie supprimée avec succès.");
        })
    }
  } 

  getImageUrl(photo: string): string {
    const image = environment.image_url + '/' + photo;
    return image;
  }

  addCategory() {
    this._router.navigate(['admin/add-category']);
  }

}
