import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ServerService} from '../server.service';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics=[];
  constructor(private router:Router,private serverservice:ServerService) {

   }
  toTopic(url){

    this.serverservice.topicid=url;
    console.log(this.serverservice.topicid);
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
