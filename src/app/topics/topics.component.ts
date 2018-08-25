import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ServerService} from '../server.service';
import { NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics=[];
  doShow=true;
  constructor(private router:Router,private serverservice:ServerService,private route:ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
       this.ngOnInit();
      
      }
      
   });
  }

  
  toTopic(url){

    this.serverservice.topicid=url;
    console.log(this.serverservice.topicid);
  }
  ngOnInit() {
    this.serverservice.getTopics().subscribe((res)=>{
       
      res.forEach(element => {
        if(!this.serverservice.topiclist.includes(element['name'])){
        this.serverservice.topiclist.push(element['name']);
        console.log("sayı artıor");
        var urlTree = this.router.createUrlTree([element['name']]);
        }
      });
      this.topics=this.serverservice.topiclist;
      console.log(this.serverservice.topiclist);
      
      
    });
  

    
  }

}
