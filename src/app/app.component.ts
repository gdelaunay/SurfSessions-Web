import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AnimationService} from './services/animation.service';

const sessionsApiUrl_DEV = 'http://localhost:5050/api';
const sessionsApiUrl_HTTP = 'http://localhost/api';
const sessionsApiUrl_HTTPS = 'https://mydomain.com/api';

export const sessionsApiUrl: string = sessionsApiUrl_HTTP;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: "<router-outlet/>"
})

export class AppComponent implements  OnInit, AfterViewInit, OnDestroy {
  title = 'SurfSessions-Web';

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    // Affichage spécifique quand zoom navigateur > 150% (desktop ou mobile/tablette paysage)
    window.addEventListener('resize', () => {
      if (window.devicePixelRatio > 1.5) {
        document.documentElement.classList.add('zoomed');
      } else {
        document.documentElement.classList.remove('zoomed');
      }
    });
  }

  ngAfterViewInit() {
    // Style des boutons aside selon l'URL
    this.highlightCurrentPage();

    // Animation 3D et hover des cartes principales
    setTimeout(() => {
      const mainCards = document.querySelectorAll('.card.main-card');
      mainCards.forEach(card => this.animationService.startAnimation(card as HTMLElement, 'idle-hover'));
    });
  }

  highlightCurrentPage(){
    const path = window.location.pathname;

    const routes = [
      { path: '/spot', id: 'spotsBtn' },
      { path: '/alert', id: 'alertsBtn' },
      { path: '/session', id: 'sessionsBtn' },
      { path: '/guest', id: 'guestBtn' },
      { path: '/', id: 'homeBtn' }
    ];
    const match = routes.find(route => path.startsWith(route.path));

    if (match) {
      document.getElementById(match.id)?.classList.add('active');
    }
  }

  ngOnDestroy() {
    const mainCards = document.querySelectorAll('.card:not([class*=" "])');
    mainCards.forEach(card => this.animationService.clearAnimation(card as HTMLElement));
  }

}
