import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class KakaoAddressService {
  kakaoAddressSearchAPI: string;
  kakaoKeywordSearchAPI: string;
  constructor() {
    this.kakaoAddressSearchAPI = "/api/v2/local/search/address.json";
    this.kakaoKeywordSearchAPI = "/api/v2/local/search/keyword.json";
  }

  /**
   * query: 검색을 원하는 질의어
   */
  async searchByAddress(query: string) {
    console.log(
      "searchByAddress",
      `${environment.host}${this.kakaoAddressSearchAPI}`
    );
    let res;
    try {
      res = await axios.post(
        `${environment.host}${this.kakaoAddressSearchAPI}`,
        {
          query,
        },
        {
          headers: {},
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async searchByKeyword(query: string) {
    console.log(
      "searchByKeyword",
      `${environment.host}${this.kakaoKeywordSearchAPI}`,
      "query",
      query
    );
    let res;
    try {
      res = await axios.post(
        `${environment.host}${this.kakaoKeywordSearchAPI}`,
        {
          query,
        },
        {
          headers: {},
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
