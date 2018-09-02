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
  topiclist=[];
  topic;
  signed;
 onetime=true;
  constructor(private serverservice:ServerService,private router:Router,private http: HttpClient) {
    this.router.events.subscribe(params => {
      if(params instanceof NavigationEnd) {
        this.threadlist=[];
        this.ngOnInit();
      } 
     
    });
}
 

 toUsersProfile(username){
  let urlTree = this.router.createUrlTree([username]);
  this.router.navigateByUrl('/user/' + username);
 }
 respawner(){
  // this.threadlist=[];
   console.log("haydeee");
  
 }

 randomInitializer(){
    return Math.floor((Math.random()*this.serverservice.topiclist.length));
 }
 linkgetter(){
   
   var url= window.location.href.slice(window.location.href.lastIndexOf('/')+1,window.location.href.length);
   if(url=="")
      return null;
   else
   {
      return url;
   }
 }
 likeFunc(clickedobj){
   console.log(clickedobj);
   this.serverservice.like(clickedobj);
 }
  ngOnInit() {

    this.topic=this.serverservice.topicid;
    this.serverservice.componentcalled.subscribe(
      () => {
        
        this.router.navigateByUrl('/'+this.serverservice.topicid);
        this.ngOnInit();
      }
    );
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
      if(this.router.url!="/" || this.router.url.toString()!="/home"){
       
       
        
     if(threads!=null){
      
      this.threadlist=[];
      threads.forEach(element => {
        this.serverservice.topicid=element.topicid;
        var currentThread=new Thread();
        currentThread.username=element['username'];
        currentThread.topicid=element['topicName'];
        currentThread.content=element['content'];
        currentThread.id=element['id'];
        this.threadlist.push(currentThread);
        this.topic=currentThread.topicid;
        this.serverservice.topicid=this.topic;
      });
     }
    }
    });
    
  }



}
