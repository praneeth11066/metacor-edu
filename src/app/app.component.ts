import { Component } from '@angular/core';
import { DataService } from './admin/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data:any;
  constructor(public ds:DataService){}
  title = 'Metacor';
  logout(){
    this.ds.logout()
  }
}
