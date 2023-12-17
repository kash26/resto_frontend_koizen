import { TableService } from './../../table/table.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';
import { DishService } from '../../dish/dish.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {
  dataForm!: FormGroup;
  category_id!: any;
  table_id!: any;
  tables!: any;
  dishes!: any[];
  isLoading: boolean = false;
  loadingTitle: string = 'Loading...';

  files: any;
  submitted: boolean = false;

  errors: any = [];

  constructor( 
    private _service: OrderService,
    private _serviceTable: TableService,
    private _serviceDish: DishService,
    private _router: Router,
    private _fb: FormBuilder,
    // private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDishes();
    this.getTables();
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this._fb.group({
      table_id: ['', Validators.required],
      dishes: [[], Validators.required]
    });
  }

  onAdd(): void {
    this.submitted = true;

    this.isLoading = true;
    this.loadingTitle = 'Creating...';
    const formData = new FormData();

    // console.log(this.dataForm.value);

    // Object.keys(this.dataForm.value).forEach(key => {
    //   formData.set(key, this.dataForm.get(key)?.value);
    // });

    this.isLoading = false;

    this._service.addData(this.dataForm.value).subscribe({
      next: (res: any) => {
        // console.log(res, 'response');
        this.isLoading = false;
        this.dataForm.reset();
        this._router.navigateByUrl('/admin/order');
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
        // console.log(this.errors, 'errors');
        // this._toastr.error('Une erreur s\'est produite lors de la création du plat.');
      }
    });
  }

  getTables() {
    this._serviceTable.getDatas().subscribe(
      (resp: any) => {
        this.tables = resp.data;
        // console.log(resp.data);
      },
      (_err: any) => {
        // console.log("Erreur lors de l'enregistrement !");
        // this._toastr.error('Une erreur s\'est produite lors de la création du plat.');
      }
    );
  }

  getDishes() {
    this._serviceDish.getDatas().subscribe(
      (resp: any) => {
        this.dishes = resp.data;
        // console.log(this.dishes);
      },
      (_err: any) => {
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

  goBack() {
    this._router.navigate(['admin/dish']);
  }

  get f() {
    return this.dataForm.controls;
  }
}
