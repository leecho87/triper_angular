import { Component, OnInit, HostListener } from "@angular/core";
import { KakaoMapService } from "@app/share/service/kakao-map.service";
import { AroundService } from "@app/share/service/around.service";
import { CoreService } from "@app/share/service/core.service";
import { AroundProps, Geolocation } from "@app/routes/around/around-model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { KakaoAddressService } from "@app/share/service/kakao-address.service";

declare const kakao;

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
  searchForm: FormGroup;
  searchResult: any;
  constructor(
    private kakaoMapService: KakaoMapService,
    private aroundService: AroundService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private kakaoAddressService: KakaoAddressService
  ) {}

  // 현재 위도는 37.4923615이고 경도는 127.02928809999999 입니다.

  async ngOnInit() {
    this.searchForm = this.formBuilder.group({
      keyword: [""],
    });
    /**
     * 브라우저를 사용하는 좌표를 얻어서 kakaoMap을 화면에 보여줍니다.
     */

    this.aroundList = [];
    /**
     * 위치기반 관광정보 조회
     */

    let mapOption;
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    try {
      const location = await this.coreService.getLocation();
      if (location instanceof Error) {
        this.latitude = null;
        this.longitude = null;
      } else {
        const { latitude, longitude } = location;
        this.latitude = latitude;
        this.longitude = longitude;
        mapOption = this.kakaoMapService.getMapOption(latitude, longitude, 3);
        console.log("location");
      }

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      this.map = this.kakaoMapService.generateMap(mapContainer, mapOption);
    } catch (error) {
      console.log("error", error);
      /**
       * Geolocation 기본값을 줍니다.
       */
      mapOption = this.kakaoMapService.getMapOption(
        37.4923615,
        127.02928809999999,
        3
      );
      this.map = this.kakaoMapService.generateMap(mapContainer, mapOption);
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

  async searchHandler(e) {
    e.preventDefault();
    const { keyword } = this.searchForm.getRawValue();
    console.log(keyword);
    try {
      const result = await this.kakaoAddressService.searchByKeyword(keyword);
      console.log('result', result);
      this.searchResult = result.data.documents.shift();
      console.log(this.searchResult);
      const { address_name, x: longitude, y: latitude } = this.searchResult;
      this.searchForm.patchValue({
        searchForm: address_name,
      });

      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = this.kakaoMapService.getMapOption(
        parseFloat(latitude),
        parseFloat(longitude),
        3
      );

      this.map = this.kakaoMapService.generateMap(mapContainer, mapOption); // 지도를 생성합니다

      // 마커가 표시될 위치입니다
      const markerPosition = new kakao.maps.LatLng(
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

  pageBack() {}
}
