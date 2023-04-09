import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Observable } from 'rxjs';

import { FOODS_BY_SEARCH_URL, FOODS_URL,FOODS_TAGS_URL } from '../shared/constants/url';
import { Tag } from '../shared/models/Tag';
import { FOODS_BY_TAG_URL } from '../shared/constants/url';
import { FOOD_BY_ID_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getallFoods (): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodsbySearchTerm(searchTerm:string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+ searchTerm);
  }
  getAllTags():Observable<Tag[]>{
  return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }
  getAllTagsByTagName(tag:String): Observable<Food[]> {
    return tag === 'All' ?
    this.getallFoods() :
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);

  }
  getFoodDetails(id: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL +id);
  }
}
