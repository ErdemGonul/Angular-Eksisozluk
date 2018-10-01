import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ServerService} from '../server.service';
import { NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { map, filter, catchError, mergeMap,share,first } from 'rxjs/operators';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics=[];
  subscriptionTopic;
  doShow=true;
  onetime=false;
  constructor(private router:Router,private serverservice:ServerService,private route:ActivatedRoute) {

  }
  refresh(){
    console.log("yenilense");
    this.ngOnInit();
  }
  
  toTopic(url){
    console.log(url);
    this.serverservice.topicid=url;

  }
  ngOnInit() {

    
   this.subscriptionTopic=this.serverservice.readMostRecentlyUpdatedTopics().subscribe((result)=>{
    let data = JSON.stringify(result);
    var x=JSON.parse(data);

    for (var i = 0, l = x.length; i < l; i++) {
      if(!this.serverservice.topiclist.includes(x[i].name)){
      var obj = x[i].name;
      this.serverservice.topiclist.push(obj);
      let urlTree = this.router.createUrlTree([obj]);
  }}
  this.serverservice.setTheBoolean(true);


      this.topics=this.serverservice.topiclist;
      this.subscriptionTopic.unsubscribe();
    });
  }
  }


