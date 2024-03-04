import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCategoryService } from 'src/app/services/get-category.service';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _GetCategoryService: GetCategoryService) {}

  allCategoriesResponse: any[] = [];
  subCategory: any;

  ngOnInit(): void {
    this._GetCategoryService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategoriesResponse = response.data;
      },
    });
  }

  getSubCatDetails(subCatID: string, subCatName: string): void {
    this._GetCategoryService.getSubCategory(subCatID).subscribe({
      next: (response) => {
        this.subCategory = response.data;
        this.subCategory.mainName = subCatName; // adding custom key:value to the subCategory object
      },
    });
  }
}
