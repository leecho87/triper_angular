import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '@app/share/service/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchHistory: Array<string>;
  searchResult: any;
  searchCount: number;
  searchTotalCount: number;
  searchWord: string;

  constructor(
    private _location: Location,
    private httpService: HttpService,
  ) {
    this.searchHistory = [];
    this.searchCount = 50;
  }

  ngOnInit() {
  }

  pageBack() {
    this._location.back();
  }

  searchHandler(event:KeyboardEvent){
    if ( event.keyCode !== 13 ) {
      return
    }
    const el = event.target as any;
    const value = el.value;
    this.onSearch(value);
    this.clearSearch(el);
  }

  clearSearch(el){
    return el.value = '';
  }

  onSearch(keyword){
    this.searchWord = keyword;
    this.searchHistory = [ ...this.searchHistory, keyword]

    // const param = this.httpService.setParams({keyword});
    this.httpService.get('searchKeyword', {
      keyword,
      numOfRows: this.searchCount
    }).subscribe(data => {
      this.searchTotalCount = data.response.body.totalCount;
      this.searchResult = data.response.body.items.item;
    })
  }
}