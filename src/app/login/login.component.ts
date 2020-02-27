import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../admin/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedinuser;
  loggedinstatus;
  constructor(private router:Router,private ds:DataService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.ds.logout()
    },0)
    // $scope.refresh();
  }
  submitData(obj)
  {
    console.log(obj);
    if(obj.role=="admin"){
if(obj.username!=="admin")
{
  console.log("no match of username");
  alert("invalid username")
}
else if(obj.password!=="admin")
{
  alert("invalid password")
}
 else
 {

  this.ds.loggedinStatus=true;
   this.router.navigate(['/admin'])

 }   
}
//studentlogin
else if(obj.role=="student"){
  console.log(obj);
  this.ds.loginstudent(obj).subscribe((res)=>{
    if(res["message"]=="invalid-studentid"){
      alert("invalid-username")
    }
    else if(res["message"]=="invalid-password"){
      alert("invalid-password")
    }
    else{
      
    this.ds.loggedinStatus=true;
    this.ds.loggedinUser=res["name"];
     console.log(this.ds.loggedinUser)
    this.router.navigate(['/student'])
    }
    
  })
}
  else if(obj.role=="")
  {
    alert("select either student or admin")
  }
}
 
}
  
  