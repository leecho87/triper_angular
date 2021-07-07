import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  animations:[
    slideInAnimation
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
