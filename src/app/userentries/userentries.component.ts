import { Component, OnInit } from '@angular/core';
import{ServerService} from '../server.service';
import { Router } from '@angular/router';
import { Thread } from 'src/app/thread';
@Component({
  selector: 'app-userentries',
  templateUrl: './userentries.component.html',
  styleUrls: ['./userentries.component.css']
})
export class UserentriesComponent implements OnInit {
  entries=[];
  readThreadSubscription;
  pages=[] as number[];
  username;
  currentPage=parseInt(this.router.url.slice(this.router.url.lastIndexOf('/')+1,this.router.url.length));
  
  constructor(private serverservice:ServerService,private router:Router) { 
    if(isNaN(this.currentPage)){
      this.currentPage=1;
    }
   this.username=this.serverservice.signed.username;
  }

    
  
  ngOnInit() {
    this.readThreadsSubscribe(this.username,this.currentPage);
  }
  toTopic(url){
    this.router.navigateByUrl("/" + url);
  }
  toNthPage(page){
    this.router.navigate(['user',this.username,this.currentPage]);
    this.refreshComponent();
  }
  toNextPage(){
    if(this.pages.includes(this.currentPage+1)){
    this.currentPage++;
    
    this.router.navigate(['user',this.username,this.currentPage]);
    this.refreshComponent();
    }
  }
  toPreviousPage(){
    if(this.pages.includes(this.currentPage-1)){
    this.currentPage--;

    this.router.navigate(['user',this.username,this.currentPage]);
    this.refreshComponent();
    }
  }
  refreshComponent(){
    this.readThreadSubscription.unsubscribe();
    this.entries=[];
    this.pages=[];
    this.ngOnInit();
  }

  readThreadsSubscribe(username,currentPage){
    this.readThreadSubscription=this.serverservice.readThreadsFromUser(this.username,this.currentPage).subscribe((entrylist)=>{
     
      if(entrylist!=null ){
        for(var i=1;i<entrylist['totalPageCount'];i++){

          this.pages.push(i);
        }
        
        entrylist = entrylist['threadDTOs'];
        
        entrylist.forEach(element => {
          var currentThread=new Thread();
          currentThread.username=element['username'];
          currentThread.topicid=element['topicName'];
          currentThread.content=element['content'];
          this.entries.push(currentThread);
        });
       }});
  }
  }

