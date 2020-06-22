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
    const view:number = window.outerHeight;
    const containerEl:HTMLDivElement = document.querySelector('.container');
    const headerEl:HTMLHeadElement = document.querySelector('.header');
    console.log(containerEl);
    console.log(headerEl);
    console.log(headerEl.clientHeight);
    
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