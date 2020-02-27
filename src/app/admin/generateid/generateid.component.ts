import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-generateid',
  templateUrl: './generateid.component.html',
  styleUrls: ['./generateid.component.css']
})
export class GenerateidComponent implements OnInit  {
  data:object[]=[]
  dataObj:object[]=[]
 constructor(private ds:DataService){}

 ngOnInit() {
  this.ds.idgetdata().subscribe((read)=>{
    this.data=read["message"]
    console.log(this.dataObj);
  })
}

 submitData(obj)
  {
console.log(obj);
obj.count=1;
//this.data.push(obj);
this.ds.idpostservice(obj).subscribe((res)=>{
  console.log(res)
  if(res['message']==="id generated already")
  {
    alert("branch id already generated");
    this.ngOnInit();
  }
  else if(res["message"]==="successful"){
    alert("successfull")
    this.ngOnInit();
  }
})
}

}
