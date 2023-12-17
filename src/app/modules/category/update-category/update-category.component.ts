import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  dataForm!: FormGroup;
  name!: string;
  category: any;
  categoryId!: any;
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';
  errors: any = [];

  submitted: boolean = false;

  constructor( 
    private toastr: ToastrService,
    private _service: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.submitted = true;
    this.categoryId = this._route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this._service.getData(this.categoryId)
      .subscribe((res: any) => {
        console.log(res.data);
        this.isLoading = false;
        this.dataForm.patchValue(res.data?.attributes);
        // this.name = res.data?.attributes.name;
      });
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      name: ['', Validators.required],
      is_visible: ['']
    });
  }

  onUpdate(): void {
    this.isLoading = true;
    this.loadingTitle = 'Création';
    const id =  this.categoryId;

    let data = {
      is_visible: this.dataForm.value.is_visible,
      name: this.dataForm.value.name
    };

    // const formData = new FormData();

    // Object.keys(this.dataForm.value).forEach(key => {
    //   formData.set(key, this.dataForm.get(key)?.value);
    // });

    this._service.update(data, id).subscribe({
      next: (res: any) => {
        // console.log(res, 'response');
        this.toastr.success('La catégorie a été modifier!', 'Modification!');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/category');
      },
      error: (err: any) => {
        this.toastr.error('Une est survenue lors de la modification de catégorie!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        // console.log(this.errors);
      }
    });
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    this.dataForm.patchValue({
      photo: file
    });
  }

  get f() {
    return this.dataForm.controls;
  }

  goBack() {
    this._router.navigate(['admin/category']);
  }

}
