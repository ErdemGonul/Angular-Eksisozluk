import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ServerService} from '../server.service';
import { Thread } from '../thread';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { NavigationEnd } from '@angular/router/';
@Component({
  selector: 'app-topic-component',
  templateUrl: './topic-component.component.html',
  styleUrls: ['./topic-component.component.css']
})


export class TopicComponentComponent implements OnInit {
  href=window.location.href;
  threadlist:Thread[]=[];
  
  topic;
  constructor(private serverservice:ServerService,private router:Router) {
    this.router.events.subscribe(params => {
      if(params instanceof NavigationEnd) {
        this.threadlist=[];
        this.ngOnInit();
      }
     
    });
     
    

 }
 
  ngOnInit() {

    this.topic=this.serverservice.topicid;
    
    this.serverservice.getThreads().subscribe((threads) => {
     if(threads!=null){
      threads.forEach(element => {
        var currentThread=new Thread();
        currentThread.username=element['username'];
        currentThread.topicid=element['topicId'];
        currentThread.content=element['content'];
        this.threadlist.push(currentThread);
        console.log(currentThread);
     
      });
     
    
     }
    });
  
  }



}
