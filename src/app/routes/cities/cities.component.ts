import { Component, OnInit } from "@angular/core";
import { CitiesService } from "@app/share/service/cities.service";
import { Locations } from "@app/share/service/locations";

@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
})
export class CitiesComponent implements OnInit {
  cities: Array<Object>;
  selectedCity: number;
  locations: Array<Object>;
  locationAll: Object;

  constructor(private citiesService: CitiesService) {
    this.selectedCity = 1;
    this.locationAll = this.citiesService.locationAll;
  }

  ngOnInit() {
    this.citiesService.getCitiesItems().subscribe((data) => {
      this.cities = data.response.body.items.item;
    });
    this.citiesService
      .getCitiesItems({ areaCode: this.selectedCity })
      .subscribe((data) => {
        const result = this.mergeData(
          data.response.body.items.item,
          Locations[this.selectedCity]
        );
        this.locations = result;
      });
    setTimeout(() => {
      this.locationVisibleHandler();
    }, 500);
  }

  mergeData(arr1, arr2) {
    return Object.assign(arr1, arr2);
  }

  onChangeLocation(code) {
    this.selectedCity = code;
    this.citiesService
      .getCitiesItems({ areaCode: this.selectedCity })
      .subscribe(
        (data) => {
          const items = data.response.body.items.item;
          if (typeof items === "object" && !Array.isArray(items)) {
            this.locations = [items];
          } else {
            this.locations = items;
          }
        },
        (err) => console.log(err),
        () => {
          setTimeout(() => {
            this.locationVisibleHandler();
          }, 0);
        }
      );
  }

  locationVisibleHandler() {
    const btn: HTMLLinkElement = document.querySelector(".local-list-fold");
    const item: HTMLLIElement = document.querySelector(".local_item");
    const list: HTMLUListElement = document.querySelector(".local_list");
    let heightFlag = item.clientHeight;

    if (list.clientHeight <= heightFlag) {
      btn.style.display = "none";
    } else {
      btn.style.display = "block";
    }
  }

  onlocationFold(event: MouseEvent) {
    let el: any = event.target as Element;
    let list: HTMLUListElement = document.querySelector(".local_list");

    if (el.dataset.state === "close") {
      el.dataset.state = "open";
      list.style.maxHeight = "none";
    } else {
      el.dataset.state = "close";
      list.removeAttribute("style");
    }
  }
}
