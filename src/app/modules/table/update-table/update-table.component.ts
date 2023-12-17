import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../table.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-table',
  templateUrl: './update-table.component.html',
  styleUrls: ['./update-table.component.css']
})
export class UpdateTableComponent {
  dataForm!: FormGroup;
  number!: any;
  table: any;
  tableId!: any;
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  errors: any = [];

  constructor( 
    private toastr: ToastrService,
    private _service: TableService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.tableId = this._route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this._service.getData(this.tableId)
      .subscribe((res) => {
        console.log(res.data);
        this.isLoading = false;
        this.number = res.data?.attributes.number;
      });
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      number: ['', Validators.required],
    });
  }

  onUpdate(): void {
    this.isLoading = true;
    this.loadingTitle = 'Edition';

    let data = {
      id: this.tableId,
      number: this.dataForm.value.number
    };

    this._service.update(data).subscribe({
      next: (res: any) => {
        // console.log(res, 'response');
        this.toastr.success('La table a été modifier!', 'Modification!');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/table');
      },
      error: (err: any) => {
        this.toastr.error('Une est survenue lors de la modification de la table!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        // console.log(this.errors);
      }
    });
  }

  goBack() {
    this._router.navigate(['admin/table']);
  }
}
