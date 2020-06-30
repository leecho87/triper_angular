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
  locationAll: Object;

  constructor(
    private citiesService:CitiesService
  ) {
    this.selectedCity = 1;
    this.locationAll = this.citiesService.locationAll;
  }

  async ngOnInit() {
    this.citiesService.getCitiesItems().subscribe(data => {
      this.cities = data.response.body.items.item;
    });
    this.citiesService.getCitiesItems({"areaCode" : this.selectedCity}).subscribe(data => {
      this.locations = data.response.body.items.item;
    });
    await this.locationVisibleHandler();
  }

  onChangeLocation(code){
    this.selectedCity = code;
    this.citiesService.getCitiesItems({"areaCode" : this.selectedCity}).subscribe(data => {
      this.locations = data.response.body.items.item;
    },
    (err) => console.log(err),
    () => {
      this.locationVisibleHandler();
    }
    );
  }

  locationVisibleHandler(){
    setTimeout(() => {
      const btn:HTMLLinkElement = document.querySelector('.local-list-fold');
      const item:HTMLLIElement = document.querySelector('.local_item');
      const list:HTMLUListElement = document.querySelector('.local_list');
      let heightFlag = item.clientHeight;
      
      if ( list.clientHeight <= heightFlag ) {
        btn.style.display = 'none'
      } else {
        btn.style.display = 'block'
      }
    }, 200)
  }

  onlocationFold(event: MouseEvent){
    let el:any = event.target as Element;
    let list:HTMLUListElement = document.querySelector('.local_list');

    if ( el.dataset.state === "close" ) {
      el.dataset.state = "open";
      list.style.maxHeight = "none";
    } else {
      el.dataset.state = "close";
      list.removeAttribute("style");
    }
  }
}