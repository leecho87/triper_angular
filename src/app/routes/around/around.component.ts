import { Component, OnInit, HostListener } from "@angular/core";
import { KakaoMapService } from "@app/share/service/kakao-map.service";
import { AroundService } from "@app/share/service/around.service";

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
  constructor(
    private kakaoMapService: KakaoMapService,
    private aroundService: AroundService
  ) {}

  // 현재 위도는 37.4923615이고 경도는 127.02928809999999 입니다.

  ngOnInit() {
    /**
     * 브라우저를 사용하는 좌표를 얻어서 kakaoMap을 화면에 보여줍니다.
     */

    console.log("ngOnInit");
    this.setGeolocation().then(async (result: { coords: any }) => {
      if (result && result.coords) {
        const { latitude, longitude } = result.coords;
        console.log("latitude", latitude, "longitude", longitude);

        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = this.kakaoMapService.getMapOption(
          latitude || 37.4923615,
          longitude || 127.02928809999999,
          3
        );
        console.log("latitude", latitude, "longitude", longitude);
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        this.map = this.kakaoMapService.generateMap(mapContainer, mapOption);

        /**
         * 위치기반 관광정보 조회
         */
        const locationBasedList = await this.aroundService.locationBasedList(
          this.latitude,
          this.longitude,
          2000
        );
        console.log("locationBasedList", locationBasedList);
      }
    });
  }

  onResize(event) {
    console.log("here");

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(() => {
      this.map.relayout();
    }, 200);
  }

  setGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
