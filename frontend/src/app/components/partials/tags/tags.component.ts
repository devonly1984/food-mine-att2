import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tags } from 'src/app/shared/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags?: Tags[];
  constructor(foodService: FoodService) {
    foodService.getAllTags().subscribe(serverTags=> {
      this.tags = serverTags;
    })

  }

}
