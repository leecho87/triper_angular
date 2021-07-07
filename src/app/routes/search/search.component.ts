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
  searchResultEmpty: boolean;
  pageNum: number;

  constructor(
    private _location: Location,
    private httpService: HttpService,
  ) {
    this.searchResultEmpty = false;
    this.searchHistory = [];
    this.searchCount = 50;
    this.pageNum = 1;
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

  clearHistory(){
    this.searchHistory = [];
  }

  onSearch(keyword){
    this.httpService.get('searchKeyword', {
      keyword,
      numOfRows: this.searchCount
    }).subscribe(data => {
      this.searchWord = keyword;
      this.searchHistory = [ ...this.searchHistory, keyword];
      const res = data.response.body;
      if (
        res.items === 'undefiend' || res.items === ''
      ) {
        this.searchResultEmpty = true;
      } else {
        this.searchResultEmpty = false;
        this.searchResult = res.items.item;
        this.searchTotalCount = res.totalCount;
      }
    })
  }

  listMore(keyword){
    this.pageNum++;
    console.log('[listMore', this.pageNum);

    this.httpService.get('searchKeyword', {
      keyword,
      numOfRows: this.searchCount,
      pageNo : this.pageNum
    }).subscribe(data => {
      const item = data.response.body.items.item;
      for(let i=0; i<item.length; i++){
      this.searchResult = [...this.searchResult, item[i]];
      }
      console.log('[listMore', this.searchResult);

    })
  }
}