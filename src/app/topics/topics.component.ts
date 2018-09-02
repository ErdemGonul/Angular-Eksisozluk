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
  refresh(){
    console.log("yenilense");
    this.ngOnInit();
  }
  
  toTopic(url){
    this.serverservice.topicid=url;
  }
  ngOnInit() {
    this.serverservice.getTopics().subscribe((res)=>{
      this.topics=this.serverservice.topiclist;
    });
  

    
  }

}
