import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Triper';

  constructor(){

  }

  ngOnInit(){
    setTimeout(() => {
      this.containerScroll()
    }, 0)
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
}