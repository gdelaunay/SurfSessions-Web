import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HttpClient} from '@angular/common/http';
import {ForecastService} from '../../services/forecast.service';
import {NgIf} from '@angular/common';
import {ForecastComponent} from '../forecast/forecast.component';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    NgIf,
    ForecastComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  forecasts: any;
  error: any;
  errorUrl: any;

  constructor(private http: HttpClient, private forecastService: ForecastService) {  }

  ngOnInit() {
    this.error = null;
    this.forecastService.getForecastDaily(47.124498, -2.216052)
      .subscribe({
      next: (data) => {
        this.forecasts = data;
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.error = `HTTP ${err.status} - ${err.statusText} : `;
        this.errorUrl = err.url;
      }
    });
  }

}
