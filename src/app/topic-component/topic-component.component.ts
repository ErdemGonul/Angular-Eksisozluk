import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ServerService} from '../server.service';
import { Thread } from '../thread';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { NavigationEnd } from '@angular/router/';
import { currentId } from 'async_hooks';
@Component({
  selector: 'app-topic-component',
  templateUrl: './topic-component.component.html',
  styleUrls: ['./topic-component.component.css']
})


export class TopicComponentComponent implements OnInit {
  href=window.location.href;
  threadlist:Thread[]=[];
  topiclist=[];
  topic;
 onetime=true;
  constructor(private serverservice:ServerService,private router:Router,private http: HttpClient) {
    this.router.events.subscribe(params => {
      if(params instanceof NavigationEnd) {
        this.threadlist=[];
        this.ngOnInit();
      }
     
    });
     
    

 }
 respawner(){
   this.threadlist=[];
   this.ngOnInit();
 }
 randomInitializer(){
    return Math.floor((Math.random()*this.serverservice.topiclist.length));
 }
 linkgetter(){
   return window.location.href.slice(window.location.href.lastIndexOf('/'),window.location.href.length);
 }
  ngOnInit() {
   
    this.topic=this.serverservice.topicid;
    
    this.serverservice.getTopics().subscribe((topics) => {
     
      if((this.router.url=="/" || this.router.url=="/home")&& this.onetime==true){
        
        this.serverservice.topicid=this.serverservice.topiclist[this.randomInitializer()];
        this.topic=this.serverservice.topicid;


        this.serverservice.getThreads(this.topic).subscribe((threads) => {
          if(threads!=null ){
           threads.forEach(element => {
             var currentThread=new Thread();
             currentThread.username=element['username'];
             currentThread.topicid=element['topicId'];
             currentThread.content=element['content'];
             this.threadlist.push(currentThread);
           });
           
          }
         });
         this.onetime=false;}
     });
    this.serverservice.getThreads(this.linkgetter()).subscribe((threads) => {
      
     if(threads!=null){
      this.threadlist=[];
      threads.forEach(element => {
        var currentThread=new Thread();
        currentThread.username=element['username'];
        currentThread.topicid=element['topicName'];
        currentThread.content=element['content'];
        this.threadlist.push(currentThread);
        this.topic=currentThread.topicid;
      });
     }
    });
  }



}
