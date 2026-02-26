import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allRecips: any[],searchkey:string):any[]{

    const result:any=[]
    if(!allRecips||searchkey==","){
      return allRecips
    }
    allRecips.forEach((item)=>{
      if(item["name"].toLowerCase().includes(searchkey.toLowerCase())){  //by using foreach ,item name in allrecipes...will convert to lowercase also same for search i/p field must be converted to lowercase as user enters
        result.push(item)
      }
    })
    return result;
  }

}
