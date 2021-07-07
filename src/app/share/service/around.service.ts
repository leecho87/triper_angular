import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class AroundService {
  serviceLabel = "locationBasedList";
  constructor(private httpService: HttpService) {}

  /**
   * 위치를 기반으로 주변 관광정보를 받아옵니다.
   * @param mapX
   * @param mapY
   * @param range
   */
  locationBasedList(
    mapY,
    mapX,
    range = 2000,
    listYN = "Y"
  ): Promise<{ response }> {
    return new Promise((resolve, reject) => {
      const param = {
        mapX,
        mapY,
        radius: range,
        listYN,
      };

      this.httpService.get(this.serviceLabel, param).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
