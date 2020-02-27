import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

   searchTerm:string;
  constructor(private ds:DataService) { }
  data:any=[]=[]
  data1;

  ngOnInit() {
    this.data1=this.ds.toComponent();
    console.log(this.data1);

    this.ds.getdata(this.data1).subscribe((read)=>{
      this.data=read["message"]
      console.log(this.data);
      
    })
  }

  
  delete(obj)
  {
    console.log(obj)
  this.ds.dodelete(obj).subscribe((res)=>{
    if(res["message"]=="success"){
    
    alert("successfully removed")
    this.data=res["data"]
    
    
    }
  })
  }
  submitData(obj)
  {
    console.log(obj);
    //this.data.push(obj)
    this.ds.doregister(obj).subscribe((res)=>{
    if(obj["message"]=="successful"){
      alert("order successfull")
    }
  })
}
  edit(obj)
  {
    console.log(obj);
    this.ds.updatedetails(obj).subscribe((res)=>{
      alert(res["message"])
    })
    
  }
obj={'gyear':0,'gbranch':''}
changeyear(gyear:any)
  {
    if(gyear==="all"){
      this.ngOnInit();
    }
    else{
      console.log(gyear)
      this.obj.gyear=gyear;
      this.obj.gbranch=this.data1;
      console.log(this.obj.gbranch);
      
      this.ds.sortByYear(this.obj).subscribe((dataArray)=>{

        if(dataArray["message"]==="nodatafound"){
          alert("no data found")
        }
        else{
          this.data=dataArray["message"]
        }
      })

    }
  }

  updateobj={"fullname":"",
             "date":"",
             "phonenumber":"",
             "gbranch":"",
             "gyear":null,
             "qua":null,
             "inm":null,
             "email":"",
             "gender":"",
             "city":"",
             "add":"",
             "state":"",
             "pincode":null,
      };
  update(data)
  {
this.updateobj=data;
  }


}
