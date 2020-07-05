import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CoreService {
  latitude: number;
  longitudue: number;
  constructor() {}

  setXY(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitudue = longitude;
  }

  getXY(): { latitude: number; longitude: number } {
    return {
      latitude: this.latitude,
      longitude: this.longitudue,
    };
  }

  getLocation(): Promise<{ latitude; longitude } | Error> {
    console.log("getLocation");
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        console.log("GPS 지원함");

        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("position", position);
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log("error!", error);
            reject(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 5000,
          }
        );
      } else {
        reject("GPS not supported");
      }
    });
  }
}
