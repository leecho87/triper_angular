import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../share/service/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurant:Array<Object>;

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.restaurantService.getRestaurantItems({
      'contentTypeId' : 39,
      'arrange' : 'P'
    }).subscribe(data => {
      this.restaurant = data.response.body.items.item;
    });
  }
}
