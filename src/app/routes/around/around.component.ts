import { Component, OnInit, HostListener } from "@angular/core";
import { KakaoMapService } from "@app/share/service/kakao-map.service";
import { AroundService } from "@app/share/service/around.service";
import { CoreService } from "@app/share/service/core.service";
import { AroundProps, Geolocation } from "@app/routes/around/around-model";

@Component({
  selector: "app-around",
  templateUrl: "./around.component.html",
  styleUrls: ["./around.component.scss"],
})
export class AroundComponent implements OnInit {
  map: any;
  timer: number;
  latitude: number;
  longitude: number;
  AroundService: any;
  aroundList: AroundProps[];
  constructor(
    private kakaoMapService: KakaoMapService,
    private aroundService: AroundService,
    private coreService: CoreService
  ) {}

  // 현재 위도는 37.4923615이고 경도는 127.02928809999999 입니다.

  async ngOnInit() {
    /**
     * 브라우저를 사용하는 좌표를 얻어서 kakaoMap을 화면에 보여줍니다.
     */

    this.aroundList = [];
    /**
     * 위치기반 관광정보 조회
     */

    try {
      const location = await this.coreService.getLocation();
      console.log("location", location);

      let mapOption;
      if (location instanceof Error) {
        this.latitude = null;
        this.longitude = null;
        console.log("Error");
        mapOption = this.kakaoMapService.getMapOption(
          37.4923615,
          127.02928809999999,
          3
        );
      } else {
        const { latitude, longitude } = location;
        this.latitude = latitude;
        this.longitude = longitude;
        mapOption = this.kakaoMapService.getMapOption(latitude, longitude, 3);
        console.log("location");
      }

      const mapContainer = document.getElementById("map"); // 지도를 표시할 div

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      this.map = this.kakaoMapService.generateMap(mapContainer, mapOption);
    } catch (error) {
      console.log("error", error);
    }

    const locationBasedList = await this.aroundService.locationBasedList(
      this.latitude,
      this.longitude,
      2000,
      "Y"
    );

    const { response } = locationBasedList;
    const { body } = response;
    const { items } = body;
    console.log("locationBasedList", locationBasedList);
    console.log("ngOnInit end");
    this.aroundList = items.item;
  }

  onResize(event) {
    console.log("here");

    // if (this.timer) {
    //   clearTimeout(this.timer);
    // }

    // this.timer = window.setTimeout(() => {
    //   this.map.relayout();
    // }, 200);
  }

  setGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
