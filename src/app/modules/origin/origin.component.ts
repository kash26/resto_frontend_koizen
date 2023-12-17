import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OriginService } from './origin.service';
import { Origin } from 'src/app/model.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent implements OnInit {
  datas$!: any[];
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  constructor (
    private toastr: ToastrService,
    private _service: OriginService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDataList();
  }

  getDataList() {
    this._service.getDatas().subscribe(
      (resp: any) => {
        this.isLoading = false;
        this.datas$ = resp.data;
        // console.log(this.datas$);
      },
      (_err) => {
        this.isLoading = false;
        console.log("Erreur lors de l'enregistrement !");
      }
    );
  }

  delete(event: any, originId: any) {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer ce pays ?')) {
      event.target.innerText = "Suppresion...";

      this._service.delete(originId)
        .subscribe((res: any) => {
          this.getDataList();
          this.toastr.success('Pays supprimé avec succès.!', 'Suppression!');
          // alert("Catégorie supprimée avec succès.");
        })
    }
  } 

  addOrigin() {
    this._router.navigate(['admin/add-origin']);
  }

}
