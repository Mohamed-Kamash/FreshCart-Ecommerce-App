import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{
  constructor(private _BrandsService:BrandsService){}

  allBrands:any[]=[]

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(response)=>{
        this.allBrands = response.data
        
      }
    })
    
  }

}
