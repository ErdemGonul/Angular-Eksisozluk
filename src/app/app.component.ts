import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from './server.service';
import { ViewChild } from '@angular/core';
import { TopicsComponent } from 'src/app/topics/topics.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(TopicsComponent) topicsComp:TopicsComponent;
  title = 'angularyafi';
  constructor(private router:Router,private serverservice:ServerService) {
   
      }
   
  toMainPage(){
    
    this.router.navigateByUrl('home');
    
}

  signout(){
    localStorage.setItem("signed",null);
    this.serverservice.signed=null;
  }

ngOnInit() {
}

}
