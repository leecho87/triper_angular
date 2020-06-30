import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Triper';
  latitude;
  longitude;

  constructor(){

  }

  ngOnInit(){
    setTimeout(() => {
      this.containerScroll()
      this.setGeolocation();
    }, 0);
  }

  containerScroll():void {
    const max:number = 260;
    const headerEl:HTMLHeadElement = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
      let y = window.scrollY;
      const opacity = (1 - (y / max)).toFixed(1);
      
      if ( y < max ) {
        headerEl.style.opacity = opacity;
      } else {
        return;
      }
    })
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