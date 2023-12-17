import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../dish.service';
import { OriginService } from '../../origin/origin.service';
import { CategoryService } from '../../category/category.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-dish',
  templateUrl: './update-dish.component.html',
  styleUrls: ['./update-dish.component.css']
})
export class UpdateDishComponent implements OnInit {
  dataForm!: FormGroup;
  submitted = false;
  errors: any = {};
  categories: any[] = [];
  origins: any[] = [];
  dish: any;
  dishId!: any;
  photo: any;
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  constructor(
      private toastr: ToastrService,
      private _fb: FormBuilder,
      private _route: ActivatedRoute,
      private _router: Router,
      private _service: DishService,
      private _categoryService: CategoryService,
      private _originService: OriginService
  ) {}

  ngOnInit() {
      this.getCategories();
      this.getOrigins();
      this.dishId = this._route.snapshot.paramMap.get('id');
      this.isLoading = true;
      this.getDish(this.dishId);
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      id: [this.dishId],
      name: [],
      description: [],
      price: [],
      preparation_time: [],
      photo: [null],
      category_id: [],
      origin_id: [],
      is_visible: [false]
    });
  }

  get f() {
      return this.dataForm.controls;
  }

  getCategories() {
      this._categoryService.getDatas().subscribe(
          (response: any) => {
              this.categories = response.data;
          },
          (error: any) => {
              console.log(error);
          }
      );
  }

  getOrigins() {
      this._originService.getDatas().subscribe(
          (response: any) => {
              this.origins = response.data;
          },
          (error: any) => {
              console.log(error);
          }
      );
  }

  getDish(id: number) {
    this._service.getData(id).subscribe(
      (response: any) => {
        this.isLoading = false;
          this.dish = response.data;
          this.initForm();
          const { attributes, relationships } = response.data;
          this.photo = attributes.photo;
          this.dataForm.patchValue({
            name: attributes.name,
            description: attributes.description,
            price: attributes.price,
            preparation_time: attributes.preparation_time,
            is_visible: attributes.is_visible,
            photo: attributes.photo,
          });

          this.dataForm.patchValue({
            category_id: relationships.category_id,
            origin_id: relationships.origin_id,
          });
      },
      (error: any) => {
          console.log(error);
      }
     );
  }

  onUpdate(): void {
    this.isLoading = true;
    this.loadingTitle = 'Edition';
    this.isLoading = false;
    let data = this.dataForm.value;

    if (this.dataForm.invalid) {
        return;
    }

     data = {
        ...data,
        'is_visible': this.dataForm.get('is_visible')?.value.toString()
      };
    //  data = {
    //     ...data,
    //     'category_id': this.dataForm.value.category_id,
    //     'origin_id': this.dataForm.value.origin_id,
    //     'is_visible': this.dataForm.get('is_visible')?.value.toString()
    //   };

      this.isLoading = true;
      this.loadingTitle = 'Création';
      const formData: any = new FormData();
      formData.append('is_visible', this.dataForm.get('is_visible')?.value.toString());
  
      Object.keys(this.dataForm.value).forEach(key => {
        formData.set(key, this.dataForm.get(key)?.value);
      });

    // console.log(this.dataForm.value);
    // console.log('FormData entries:');
    // for (const entry of formData.entries()) {
    //   console.log(entry);
    // }
    this._service.update(data, this.dishId).subscribe({
      next: (res: any) => {
        this.toastr.success('Le plat a été modifier!', 'Modification!');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/dish');
      },
      error: (err: any) => {
        this.toastr.error('Une est survenue lors de la modification du plat!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  goBack() {
      this._router.navigate(['admin/dish']);
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

  getImageUrl(photo: string): string {
    const image = environment.image_url + '/' + photo;
    return image;
  }
}
