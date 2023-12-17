import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OriginService } from '../origin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-origin-update',
  templateUrl: './origin-update.component.html',
  styleUrls: ['./origin-update.component.css']
})
export class OriginUpdateComponent implements OnInit {
  dataForm!: FormGroup;
  name!: string;
  origin!: any;
  originId!: any;
  errors: any = [];
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  constructor(
    private toastr: ToastrService,
    private _service: OriginService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.originId = this._route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this._service.getData(this.originId)
      .subscribe((res: any) => {
        console.log(res.data);
        this.isLoading = false;
        this.name = res.data?.attributes.name;
      });
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      name: ['', Validators.required],
    });
  }

  onUpdate(): void {
    this.isLoading = true;
    this.loadingTitle = 'Création';

    let data = {
      id: this.originId,
      name: this.dataForm.value.name
    };

    this._service.update(data).subscribe({
      next: (res: any) => {
        this.toastr.success('Le pays a été modifier!', 'Modification!');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/origin');
      },
      error: (err: any) => {
        this.toastr.error('Une est survenue lors de la modification du pays!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        console.log(err.error.errors, 'errors');
      }
    });
  }

  goBack() {
    this._router.navigate(['admin/origin']);
  }
}

