import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-webloader',
  templateUrl: './webloader.component.html',
  styleUrls: ['./webloader.component.css'],
})
export class WebloaderComponent {
  title: string = 'Chargement...'

}
