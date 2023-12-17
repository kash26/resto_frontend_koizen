import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = "";
  password: string = "";
  name: string = "";
  passwordConfirmation: string = "";
  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    //formData.append('password_confirmation', this.passwordConfirmation);

    this.http.post(`${environment.url}/auth/register`, formData)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.router.navigateByUrl('/auth/login');
        },
        (_err: any) => {
          console.log("Erreur lors de l'enregistrement !");
        }
      );
  }
}
