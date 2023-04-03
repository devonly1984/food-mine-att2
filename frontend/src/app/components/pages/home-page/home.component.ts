import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
foods: Food[] = [];
constructor(private foodService: FoodService,activatedRoute: ActivatedRoute) {
  activatedRoute.params.subscribe(params=>{
    if (params.seachTerm) {
      this.foodService.getAllFoodsbySearchTerm(params.seachTerm)
    }
    else if (params.tag){
        this.foodService.getAllTagsByTagName(params.tag).subscribe(serverFoods => {
          this.foods = serverFoods
        })
    }
    else{
    this.foodService.getallFoods().subscribe(serverFoods => (
      this.foods = serverFoods
    ))
    }
  })

}
ngOnInit() : void {

}
}
