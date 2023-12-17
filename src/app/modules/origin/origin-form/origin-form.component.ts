import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OriginService } from '../origin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-origin-form',
  templateUrl: './origin-form.component.html',
  styleUrls: ['./origin-form.component.css']
})
export class OriginFormComponent implements OnInit {
  dataForm!: FormGroup;
  name!: string;
  errors: any = [];
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  constructor(
    private toastr: ToastrService,
    private _service: OriginService,
    private _router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      name: ['', Validators.required],
    });
  }

  onAdd(): void {
    this.isLoading = true;
    this.loadingTitle = 'Création';
    const data = this.dataForm.value;

    this._service.addData(data).subscribe({
      next: (res: any) => {
        this.toastr.success('Le pays a été crée!', 'Enregistrement!');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/origin');
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
        this.toastr.error('Une est survenue lors de la création du pays!', 'Erreur!');
        console.log(err.error.errors, 'errors');
      }
    });
  }

  goBack() {
    this._router.navigate(['admin/origin']);
  }

}