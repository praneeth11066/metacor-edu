import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private hc:HttpClient) { }

  doregister(obj):Observable<any>
  {
    console.log(obj);
    
    return this.hc.post('/save',obj)
  }
  getdata(obj):Observable<any>
  {
    return this.hc.get<any>(`/readAll/${obj}`)
  }
  updatedetails(obj):Observable<any>
  {
    console.log(obj);
    
    return this.hc.put('/update',obj)
  }
  dodelete(data):Observable<any>{
    console.log(data);
    
    return this.hc.delete(`/remove/${data.phonenumber}`)
  }
  fromComponent;
  toComponent()
  {
    console.log(this.fromComponent)
    return this.fromComponent;
  }
  idpostservice(obj):Observable<any>
  {
     return this.hc.post('/saveid',obj)
  }
  idgetdata():Observable<any>
  {
    return this.hc.get('/readid')
  }
  sortByYear(byyear):Observable<any>{
    console.log(byyear);
    return this.hc.post('/readbyyear',byyear)
  }
  //saveplacement
  doplacement(obj):Observable<any>{
    return this.hc.post('/readplacement',obj)
  }

  placementGetData():Observable<any>{
    return this.hc.get('/readplacement')
  }

  uploadplacement(data):Observable<any>{
    console.log(data);
    
    return this.hc.post<any>('/uploadplacement',data)
  }

  feeGetData():Observable<any>{
    return this.hc.get('/readfee')
  }


  dofee(obj):Observable<any>{
    return this.hc.post('/savefee',obj)
  }

  readdata(stu):Observable<any>{
    return this.hc.get<any>(`/readOne/${stu.studentid}`)
  }
  readfee(fee):Observable<any>{
    console.log('fee',fee);
    
    return this.hc.get<any>(`/readFee/${fee.studentid}`)
  }
  readPlacement(placements):Observable<any>{
    return this.hc.get<any>(`/readPlacement/${placements.gbranch}`)
  }
loggedinUser;
loggedinStatus:boolean=false;

  loginstudent(obj):Observable<any>
{
  console.log(obj); 
  return this.hc.post('/login',obj)
}

logout()
{
  this.loggedinStatus=false;
}
}
  

