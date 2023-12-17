import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from './table.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  datas$!: any[];
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  constructor (
    private toastr: ToastrService,
    private _service: TableService,
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

  delete(event: any, ingredientId: any) {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer cette table ?')) {
      event.target.innerText = "Suppresion...";

      this._service.delete(ingredientId)
        .subscribe((res: any) => {
          this.getDataList();
          this.toastr.success('Table supprimée avec succès.!', 'Suppression!');
          // alert("Catégorie supprimée avec succès.");
        })
    }
  } 

  addItem() {
    this._router.navigate(['admin/add-table']);
  }

}
