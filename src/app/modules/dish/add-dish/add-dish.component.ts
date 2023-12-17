import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DishService } from '../dish.service';
import { OriginService } from '../../origin/origin.service';
import { CategoryService } from '../../category/category.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent {
  dataForm!: FormGroup;
  name!: string;
  description!: any;
  price!: any;
  preparation_time!: any;
  photo!: any;
  category_id!: any;
  origin_id!: any;
  origins!: any;
  categories!: any;
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  files: any;
  submitted: boolean = false;

  errors: any = [];

  constructor( 
    private _service: DishService,
    private _serviceOrigin: OriginService,
    private _serviceCategory: CategoryService,
    private _router: Router,
    private _fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.image = image = environment.image_url + '/uploads/' + JSON.parse(localStorage.getItem('image') ?? '');
    this.getCategories();
    this.getOrigins();
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      preparation_time: ['', Validators.required],
      photo: [null, Validators.required],
      category_id: ['', Validators.required],
      origin_id: ['', Validators.required],
      is_visible: [false]
    });
  }

  onAdd(): void {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.loadingTitle = 'Création';
    const formData = new FormData();
    formData.append('is_visible', this.dataForm.get('is_visible')?.value.toString());

    Object.keys(this.dataForm.value).forEach(key => {
      formData.set(key, this.dataForm.get(key)?.value);
    });

    this._service.addData(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Plat crée avec succés!', 'Enregistrement!');
        console.log(res, 'response');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/dish');
      },
      error: (err: any) => {
        this.toastr.error('Une erreur est survenue lors de la création du plat!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        console.log(err.error.errors, 'errors');
      }
    });
  }

  getOrigins() {
    this._serviceOrigin.getDatas().subscribe(
      (resp: any) => {
        this.origins = resp.data;
        // console.log(this.services);
      },
      (_err) => {
        // console.log("Erreur lors de l'enregistrement !");
        // this._toastr.error('Une erreur s\'est produite lors de la création du plat.');
      }
    );
  }

  getCategories() {
    this._serviceCategory.getDatas().subscribe(
      (resp: any) => {
        this.categories = resp.data;
        // console.log(this.categories);
      },
      (_err) => {
        // console.log("Erreur lors de l'enregistrement !");
        // this._toastr.error('Une erreur s\'est produite lors de la création du plat.');
      }
    );
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    this.dataForm.patchValue({
      photo: file
    });
  }

  // Add the updateIsVisible() method to your component
  updateIsVisible(event: any): void {
    const isChecked = event.target.checked;
    const isVisibleValue = isChecked ? 1 : 0;
    this.dataForm.patchValue({ is_visible: isVisibleValue });
  }

  goBack() {
    this._router.navigate(['admin/dish']);
  }

  get f() {
    return this.dataForm.controls;
  }
}
