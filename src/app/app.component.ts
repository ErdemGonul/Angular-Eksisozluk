import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from './server.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularyafi';
  constructor(private router:Router,private serverservice:ServerService) {
   
      }
   
  toMainPage(){
    
    this.router.navigateByUrl('home');
    
}
  refresh(){
    window.location.reload();
  }

ngOnInit() {

  
}

}
