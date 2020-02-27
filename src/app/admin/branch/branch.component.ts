import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor(private router:Router,private ds:DataService) { }

  
ngOnInit() {
  }
  dataobj;
  submitBranch(obj)
  {
    console.log(obj)
    this.dataobj=obj;
    console.log(this.dataobj)
    this.ds.fromComponent=this.dataobj; 
    console.log(this.ds.fromComponent)
    this.router.navigate(['/admin/common']);
  }
}
