import { Component, OnInit } from '@angular/core';
import { StayService } from '@app/share/service/stay.service';

@Component({
  selector: 'app-stay',
  templateUrl: './stay.component.html',
  styleUrls: ['./stay.component.scss']
})
export class StayComponent implements OnInit {
  stays:Array<Object>

  constructor(
    private stayService: StayService
  ) { }

  ngOnInit() {
    this.stayService.getStayItems({
      'contentTypeId' : 39,
      'arrange' : 'P'
    }).subscribe(data => {
      this.stays = data.response.body.items.item;
    })
  }

}
