import { Injectable } from "@angular/core";
declare const kakao;

@Injectable({
  providedIn: "root",
})
export class KakaoMapService {
  constructor() {}

  getMapOption(latitude, longitude, level) {
    const mapOption = {
      center: new kakao.maps.LatLng(latitude.toFixed(6), longitude.toFixed(6)), // 지도의 중심좌표
      level, // 지도의 확대 레벨
    };
    return mapOption;
  }

  generateMap(mapContainer, mapOption) {
    console.log("generateMap");
    /**
     * mapContainer : 지도를 표히살 div
     * mapOption : 지도 옵션을 파라미터로 받습니다.
     */
    return new kakao.maps.Map(mapContainer, mapOption);
  }
}
