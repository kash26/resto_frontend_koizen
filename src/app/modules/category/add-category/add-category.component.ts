import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  dataForm!: FormGroup;
  name!: string;
  errors: any = [];
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  submitted: boolean = false;

  constructor( 
    private toastr: ToastrService,
    private _service: CategoryService,
    private _router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.submitted = true;
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      name: ['', Validators.required],
      is_visible: ['']
    });
  }

  onAdd(): void {
    this.isLoading = true;
    this.loadingTitle = 'Création';
  
    let data = this.dataForm.value;
    const is_visible = this.dataForm.get('is_visible')?.value ? 1 : 0;
    data.is_visible = is_visible;
  
    // console.log(data, 'dataForm');
    // this.isLoading = false;
  
    // const formData = new FormData();
  
    // Object.keys(data).forEach(key => {
    //   formData.append(key, data[key]);
    // });

    // const fileInput: any = this.dataForm.get('photo');
    // if (fileInput?.files && fileInput.files.length > 0) {
    //   const file = fileInput.files[0];
    //   formData.append('photo', file, file.name);
    // }
  
    this._service.addData(data).subscribe({
      next: (res: any) => {
        this.toastr.success('La catégorie a été créée!', 'Enregistrement!');
        console.log(res, 'response');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/category');
      },
      error: (err: any) => {
        this.toastr.error('Une erreur est survenue lors de la création de la catégorie!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        console.log(err.error.errors, 'errors');
      }
    });
  }

  // onAdd(): void {
  //   this.isLoading = true;
  //   this.loadingTitle = 'Création';
  //   let data = this.dataForm.value;
  //   // console.log(this.dataForm.get("is_visible")?.value, "dataForm");
  //   const formData = new FormData();
  //   if (this.dataForm.get("is_visible")?.value) {
  //     data = {
  //       is_visible: 1
  //     };
  //   } else {
  //     data = {
  //       is_visible: 0
  //     };
  //   }
  //   console.log(this.dataForm.value, "dataForm");
  //   this.isLoading = false;

  //   Object.keys(this.dataForm.value).forEach(key => {
  //     formData.set(key, this.dataForm.get(key)?.value);
  //   });

  //   this._service.addData(formData).subscribe({
  //     next: (res: any) => {
  //       this.toastr.success('Le catégorie a été crée!', 'Enregistrement!');
  //       console.log(res, 'response');
  //       this.dataForm.reset();
  //       this.isLoading = false;
  //       this._router.navigateByUrl('/admin/category');
  //     },
  //     error: (err: any) => {
  //       this.toastr.error('Une est survenue lors de la création de la catégorie!', 'Erreur!');
  //       this.errors = err.error.errors;
  //       this.isLoading = false;
  //       console.log(err.error.errors, 'errors');
  //     }
  //   });
  // }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    this.dataForm.patchValue({
      photo: file
    });
  }

  goBack() {
    this._router.navigate(['admin/category']);
  }

  get f() {
    return this.dataForm.controls;
  }
}
