import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Triper';
  latitude;
  longitude;

  constructor(
    private router: Router
  ){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollHandler(event.url);
      }
    });
  }

  ngOnInit(){
    setTimeout(() => {
      this.setGeolocation();
    }, 0);
  }

  scrollHandler(url):void {
    if ( url === '/') {
      window.addEventListener('scroll', this.scrollOpacity)
    } else {
      window.removeEventListener('scroll', this.scrollOpacity)
    }
  }

  scrollOpacity(){
    let y = window.scrollY;
    const max:number = 260;
    const headerEl:HTMLHeadElement = document.querySelector('.header');
    const opacity = (1 - (y / max)).toFixed(1);


    if ( y < max ) {
      headerEl.style.opacity = opacity;
    } else {
      return;
    }
  }

  setGeolocation(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.alarmGeolocation();
    });
  }

  alarmGeolocation():void {
    setTimeout(() => {
      console.log(`현재 위도는 ${this.latitude}이고 경도는 ${this.longitude} 입니다.`);
    }, 0)
  }
}