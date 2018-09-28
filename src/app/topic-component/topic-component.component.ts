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
  signed;
  subscriptionBool;
  subscriptionThread;
 
 

  constructor(private serverservice:ServerService,private router:Router,private http: HttpClient) {
    
   this.router.events.subscribe(params => {
      if(params instanceof NavigationEnd) {
        this.threadlist=[];
        this.ngOnInit();
      }
      });
}


 
  ngOnInit() {
  this.serverservice.firstenter=false;

  this.topic=this.serverservice.topicid;
  this.serverservice.componentcalled.subscribe(
    () => {
      this.router.navigateByUrl('/'+this.serverservice.topicid);
      this.ngOnInit();
    });  
    
    if((this.router.url=="/" || this.router.url=="/home")){
      this.subscriptionBool=this.serverservice.getTheBoolean().subscribe(value => {

        if(value==true){
          this.serverservice.topicid=this.serverservice.topiclist[this.randomInitializer()];
          this.topic=this.serverservice.topicid;
  
          this.subscriptionThread=this.serverservice.getThreads(this.topic).subscribe((threads) => {
            if(threads!=null ){
             threads.forEach(element => {
               var currentThread=new Thread();
               currentThread=element;
               this.threadlist.push(currentThread);
             });
            }
            this.subscriptionThread.unsubscribe();
           });
           this.subscriptionBool.unsubscribe();
        }
      }
    );
    
  }
  if(this.router.url!="/" && this.router.url!=""){

    
     this.subscriptionBool=this.serverservice.getTheBoolean().subscribe(value => {

      if(value==true){
  this.subscriptionThread=this.serverservice.getThreads(this.linkgetter()).subscribe((threads) => {
    this.subscriptionThread.unsubscribe();
    if(threads!=null){
    
    this.threadlist=[];
    threads.forEach(element => {
      this.serverservice.topicid=element.topicid;
      var currentThread=new Thread();
      currentThread=element;
      this.threadlist.push(currentThread);
      this.topic=currentThread.topicName;
      this.serverservice.topicid=this.topic;
    });
  }
  });}
});

}
  

}


  toUsersProfile(username){
    let urlTree = this.router.createUrlTree([username]);
    this.router.navigateByUrl('/user/' + username);
   }
   randomInitializer(){
      return Math.floor((Math.random()*this.serverservice.topiclist.length));
   }
   linkgetter(){
     var url= window.location.href.slice(window.location.href.lastIndexOf('/')+1,window.location.href.length);
     if(url=="")
        return null;
     else
        return url;
   }
   likeFunc(clickedobj){
     console.log(clickedobj);
     this.serverservice.like(clickedobj);
   }



}
