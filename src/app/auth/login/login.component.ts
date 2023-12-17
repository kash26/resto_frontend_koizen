import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  constructor(private _service: AuthService, private router: Router) { }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    
    this._service.login(formData).subscribe(
      (resp: any) => {
        console.log(resp);
        // const user = resp.user;
        const token = resp.token;
        
        // Serialize the token using JSON.stringify()
        const serializedToken = JSON.stringify(token);
        const serializedResp = JSON.stringify(resp);
        
        // localStorage.setItem('user', user);
        localStorage.setItem('resp', serializedResp);
        localStorage.setItem('token', serializedToken);
        
        this.router.navigateByUrl('/admin');
      },
      (_err: any) => {
        console.log("Erreur lors de l'enregistrement !");
      }
    );

  }
}
