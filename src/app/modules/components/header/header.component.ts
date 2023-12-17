import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  name!: string;
  
  constructor(private _service: AuthService, private router: Router) { }

  ngOnInit() {
    const storedResp: any = localStorage.getItem('resp');
    let deserializedResp: any = null;
    if (storedResp !== null) {
      deserializedResp = JSON.parse(storedResp);
      this.name = deserializedResp.user.name;
    } else {
      this.name = "Unknown";
    }
    // console.log('Deserialized Response:', deserializedResp.user);
  }

  logout() {
    this._service.logout();
    this.router.navigateByUrl('/auth/login');
  }

  toggle() {
    const element = document.body as HTMLBodyElement;
    element.classList.toggle('toggle-sidebar');
  }

}
