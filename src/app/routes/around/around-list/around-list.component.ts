import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { AroundProps } from "../around-model";

@Component({
  selector: "app-around-list",
  templateUrl: "./around-list.component.html",
  styleUrls: ["./around-list.component.scss"],
})
export class AroundListComponent implements OnInit, OnChanges {
  @Input() aroundList: AroundProps[];
  list: AroundProps[];

  constructor() {}
  ngOnChanges(): void {
    if (this.aroundList && this.aroundList.length) {
      console.log("오ㅐ", this.aroundList);
      this.list = [...this.aroundList];
      console.log("list", this.list);
    }
  }

  ngOnInit() {
    console.log("AroundListComponent OnInIt");
    this.list = [];
  }
}
