import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Observable } from 'rxjs';
import { FOODS_BY_TAG_URL, FOODS_URL } from '../constants/url';
import { Tags } from '../shared/models/Tags';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getallFoods (): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodsbySearchTerm(searchTerm:string):void {
   // return this.getallFoods().filter((food)=>food.name.toLowerCase()).includes(searchTerm.toLowerCase());
  }
  getAllTags():Observable<Tags[]>{
  return this.http.get<Tags[]>(FOODS_BY_TAG_URL);
  }
  getAllTagsByTagName(tag:String): Observable<Food[]> {
    return tag === 'All' ?
    this.getallFoods() :
    this.http.get<Food[]>(FOODS_URL);

  }
  getFoodDetails(id: string): void {
    //return this.getallFoods().find(food=> food.id === id);
  }
}
