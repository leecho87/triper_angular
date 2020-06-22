import { Component, OnInit } from '@angular/core';
import { CitiesService } from '@app/share/service/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html'
})

export class CitiesComponent implements OnInit {
  cities: Array<Object>;
  selectedCity: number;
  locations: Array<Object>;
  constructor(
    private citiesService:CitiesService
  ) { 
    this.selectedCity = 1;
  }

  ngOnInit() {
    this.citiesService.getCitiesItems({"numOfRows" : "17"}).subscribe(data => {
      this.cities = data.response.body.items.item;
    });
    this.citiesService.getCitiesItems(
      {
        "numOfRows" : "999",
        "areaCode" : this.selectedCity
      }
    ).subscribe(data => {
      this.locations = data.response.body.items.item;
    });
  }

  onloadLocation(code){
    console.log('code', code);
  }
}