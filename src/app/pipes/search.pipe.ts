import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObjects:Product[],searchTerm:string):Product[] {
    return arrayOfObjects.filter(  (object)=>object.title.toLocaleLowerCase().includes( searchTerm.toLocaleLowerCase() )  )
  }

}
