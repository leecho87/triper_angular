import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { AroundProps } from "../around-model";
import { KakaoAddressService } from "@app/share/service/kakao-address.service";
import { KakaoMapService } from "@app/share/service/kakao-map.service";

@Component({
  selector: "app-around-list",
  templateUrl: "./around-list.component.html",
  styleUrls: ["./around-list.component.scss"],
})
export class AroundListComponent implements OnInit, OnChanges {
  @Input() aroundList: AroundProps[];
  list: AroundProps[];
  searchResult: any[];
  map: any;

  constructor(
    private kakaoAddressService: KakaoAddressService,
    private kakaoMapService: KakaoMapService
  ) {}
  ngOnChanges(): void {
    if (this.aroundList && this.aroundList.length) {
      this.list = [...this.aroundList];
    }
  }

  ngOnInit() {
    this.list = [];
    this.searchResult = [];
  }

  async onClickItem(item) {
    const { addr1 } = item;

    try {
      const result = await this.kakaoAddressService.searchByAddress(addr1);
      this.searchResult = result.data.documents;
      const { address_name, x: longitude, y: latitude } = this.searchResult[0];

      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = this.kakaoMapService.getMapOption(
        parseFloat(latitude),
        parseFloat(longitude),
        3
      );

      this.map = this.kakaoMapService.generateMap(mapContainer, mapOption); // 지도를 생성합니다

      // 마커가 표시될 위치입니다
      const markerPosition = this.kakaoMapService.getPosition(
        parseFloat(latitude),
        parseFloat(longitude)
      );

      // 마커를 생성합니다
      const marker = this.kakaoMapService.getMarker(markerPosition);

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
      marker.setDraggable(true);
    } catch (error) {
      console.log(error);
    }
  }
}
