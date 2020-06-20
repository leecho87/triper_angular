import { Component, OnInit } from '@angular/core';
import { CitiesService } from '@app/share/service/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html'
})

export class CitiesComponent implements OnInit {
  cities: [];
  selectedCity: number;
  constructor(
    private citiesService:CitiesService
  ) { 
    this.selectedCity = 1;
  }

  ngOnInit() {
    this.citiesService.getCitiesItems().subscribe(data => {
      this.cities = data.response.body.items.item;      
    })
  }
}