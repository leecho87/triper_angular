import { Component, OnInit } from '@angular/core';
import { CitiesService } from '@app/share/service/cities.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor(private citiesService: CitiesService ) { }

  ngOnInit() {
    console.log(this.citiesService);
    console.log();
    this.citiesService.getCitiesItems().subscribe(data => {
      console.log('[subscribe]', data);
      
    })
  }

}
