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
  topics=[];
  constructor(private router:Router,private serverservice:ServerService) {
   
      }
   
  toMainPage(){
    this.router.navigateByUrl('home');
}
  refresh(){
    window.location.reload();
  }

ngOnInit() {

  this.serverservice.getTopics().subscribe((topic) => {
    topic.forEach(element => {
      this.topics.push(element['name']);
      this.serverservice.topiclist.push(element['name']);
      var urlTree = this.router.createUrlTree([element['name']]);
    });
  });
}

}
