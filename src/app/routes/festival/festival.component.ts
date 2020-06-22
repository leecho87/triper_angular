import { Component, OnInit } from '@angular/core';
import { FestivalService } from '@app/share/service/festival.service';

@Component({
  selector: 'app-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.scss']
})
export class FestivalComponent implements OnInit {
  festivals:Array<Object>

  constructor(
    private festivalService: FestivalService
  ) { }

  ngOnInit() {
    this.festivalService.getFestivalItems().subscribe(data => {
      this.festivals = data.response.body.items.item;
      console.log(this.festivals);
    })
  }

}
