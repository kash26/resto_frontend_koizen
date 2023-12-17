import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styleUrls: ['./update-ingredient.component.css']
})
export class UpdateIngredientComponent {
  dataForm!: FormGroup;
  name!: string;
  category: any;
  categoryId!: any;
  isLoading: boolean = false;
  loadingTitle: string = 'Chargement';

  errors: any = [];

  constructor( 
    private toastr: ToastrService,
    private _service: IngredientService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoryId = this._route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this._service.getData(this.categoryId)
      .subscribe((res) => {
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
    this.loadingTitle = 'Edition';

    let data = {
      id: this.categoryId,
      name: this.dataForm.value.name
    };

    this._service.update(data).subscribe({
      next: (res: any) => {
        // console.log(res, 'response');
        this.toastr.success('La catégorie a été modifier!', 'Modification!');
        this.dataForm.reset();
        this.isLoading = false;
        this._router.navigateByUrl('/admin/ingredient');
      },
      error: (err: any) => {
        this.toastr.error('Une est survenue lors de la modification de l\'ingredient!', 'Erreur!');
        this.errors = err.error.errors;
        this.isLoading = false;
        // console.log(this.errors);
      }
    });
  }

  goBack() {
    this._router.navigate(['admin/ingredient']);
  }
}
