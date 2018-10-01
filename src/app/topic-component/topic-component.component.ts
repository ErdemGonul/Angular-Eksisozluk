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
  subscriptionBool;
  subscriptionThread;
 
  entries=[];
  readThreadSubscription;
  pages=[] as number[];
  username;
  loopone=false;
  currentPage=parseInt(this.router.url.slice(this.router.url.lastIndexOf('/')+1,this.router.url.length));
  constructor(private serverservice:ServerService,private router:Router,private http: HttpClient) {
    console.log(this.currentPage);
  
   this.username="rup";
   this.router.onSameUrlNavigation = 'reload';
   this.router.events.subscribe(params => {
    if (!(params instanceof NavigationEnd)) { return; }
    console.log("girdiasdadadadam");
    this.ngOnInit();
      
      });
}

refreshComponent(){


}
 
ngOnInit() {
 
 
  this.topic=this.serverservice.topicid;

  this.subscriptionBool=this.serverservice.getTheBoolean().subscribe(value => {
  
  if(this.router.url=="/"){
    console.log("girdq");
    this.serverservice.topicid=this.serverservice.topiclist[this.randomInitializer()];
    this.topic=this.serverservice.topicid;
  }
  if(isNaN(this.currentPage)){
    this.currentPage=1;
  }
  if(value==true){
    this.subscriptionThread=this.serverservice.getThreads(this.topic,this.currentPage).subscribe((threads) => {
      if(threads!=null){
        if(threads['threadDTOs']!=null ){
          this.pages=[];
          for(var i=0;i<threads['totalPageCount'];i++)
            this.pages.push(i+1);    
        }
      this.threadlist=[];
      threads['threadDTOs'].forEach(element => {
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


  toUsersProfile(username){
    let urlTree = this.router.createUrlTree([username]);
    this.router.navigateByUrl('/user/' + username);
   }
   randomInitializer(){
      return Math.floor((Math.random()*this.serverservice.topiclist.length));
   }
   linkgetter(){
    var fullurl=window.location.href;
    var url;
    if((fullurl.match(new RegExp("/", "g")) || []).length>3){
      url=fullurl.slice(fullurl.lastIndexOf('0')+2,fullurl.lastIndexOf('/'));
    }
    else{
      url=fullurl.slice(fullurl.lastIndexOf('/')+1,fullurl.length);
    }
     if(url=="")
        return null;
     else
        return url;
   }
   likeFunc(clickedobj){
     this.serverservice.like(clickedobj);
   }
   toTopic(url){
    this.router.navigateByUrl("/" + url);
  }
  toNthPage(page){
    this.currentPage=page;
    this.router.navigate([this.topic,page]);

  }
  toNextPage(){
    if(this.pages.includes(this.currentPage+1)){
    this.currentPage++;
    this.router.navigate([this.topic,this.currentPage]);

    }
  }
  toPreviousPage(){
    if(this.pages.includes(this.currentPage-1)){
    this.currentPage--;
    this.router.navigate([this.topic,this.currentPage]);

    }
  }
  ngOnDestroy() {
    if (this.subscriptionBool)
     this.subscriptionBool.unsubscribe();
    if(this.subscriptionThread)
    this.subscriptionThread.unsubscribe();
    if(this.readThreadSubscription){
      this.readThreadSubscription.unsubscribe();
    }
    }

}
