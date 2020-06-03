import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../models/person';

@Pipe({
  name: 'peopleFilter'
})
export class PeopleFilterPipe implements PipeTransform {

  transform(value: Person[], search_text: string): Person[] {
    if (!search_text) {
      return value;
    } else {
      if (search_text.match('[0-9]+')) {
        return value.filter(p => p.personId.includes(search_text));
      } else {
        return value.filter(p => p.name.includes(search_text))
      }
    }
  }

}
