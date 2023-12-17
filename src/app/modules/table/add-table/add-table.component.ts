import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from '../table.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {
  dataForm!: FormGroup;
  number!: string;
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  errors: any = [];

  constructor( 
    private toastr: ToastrService,
    private _service: TableService,
    private _router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      number: ['', Validators.required],
    });
  }

  onAdd(): void {
    this.isLoading = true;
    this.loadingTitle = 'Création';
    const data = this.dataForm.value;

    this._service.addData(data).subscribe({
      next: (res: any) => {
        this.toastr.success('Table crée avec succés!', 'Enregistrement!');
        console.log(res, 'response');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/table');
      },
      error: (err: any) => {
        this.toastr.error('Une erreur est survenue lors de la création de la table!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        console.log(err.error.errors, 'errors');
      }
    });
  }

  goBack() {
    this._router.navigate(['admin/table']);
  }
}
