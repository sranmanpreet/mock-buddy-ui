import { Pipe, PipeTransform } from '@angular/core';
import { Mock } from '../models/mock.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<Mock>, args: string): Array<Mock> {
    if(!value) return [];
    if(!args) return value;

    return value.filter(function(item:any){
        return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
