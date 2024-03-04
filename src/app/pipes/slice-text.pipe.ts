import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText',
  standalone: true
})
export class SliceTextPipe implements PipeTransform {

  transform(text:string,limit:number):string  {
    return text.split(' ').slice(0,limit).join(' ')
  }

}
