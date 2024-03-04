import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCategoryService } from 'src/app/services/get-category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'category-slider',
  standalone: true,
  imports: [CommonModule ,CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss']
})
export class CategorySliderComponent implements OnInit {

  constructor(private _GetCategoryService:GetCategoryService){}

  allCategoriesResponse:any[]=[]

  ngOnInit(): void {
    this._GetCategoryService.getAllCategories().subscribe({
      next:(response)=>{
        this.allCategoriesResponse = response.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    margin:10,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
  }

}
