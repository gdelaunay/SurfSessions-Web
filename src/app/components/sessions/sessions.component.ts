import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-sessions',
  imports: [
    NgIf,
    FooterComponent
  ],
  templateUrl: './sessions.component.html'
})
export class SessionsComponent {

}
