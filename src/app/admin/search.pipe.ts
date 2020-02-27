import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data:any,searchTerm:string): any {
    if(!searchTerm)    
    {     
       return data;   
       }     
       else    
       {      
         return data.filter(data=>data["fullname"].toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
       }
  }
  }

