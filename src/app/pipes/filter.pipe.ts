import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes: {text: string, tag: string}[], searchValue:string): any {
    if (searchValue){
      return notes.filter((note:{text: string, tag: string}) =>
        note.tag.split(' ').filter((el: string) => {

          return el.indexOf(searchValue.replace('#',''),0) > 0
        }).length > 0)
    }
    return notes
  }
}


@Pipe({
  name: 'removeTags'
})
export class RemoveTagsPipe implements PipeTransform {

  transform(value: string): any {
    value.split(' ').map(el => {
      el.replace(/#/g, '')
    })
    return value.replace(/#/g, '')
  }
}
@Pipe({
  name: 'showTags'
})
export class ShowTagsPipe implements PipeTransform {

  transform(value: string): any {
    return Array.from(new Set(value.trim().split(' ').filter(el => el[0] == '#' && el.length > 1))).join(' ')
  }
}
