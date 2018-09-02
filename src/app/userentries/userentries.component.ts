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
  username;
  constructor(private serverservice:ServerService,private router:Router) { 

   this.username="user";
  }

  ngOnInit() {
    

    this.serverservice.readThreadsFromUser(this.username).subscribe((entrylist)=>{
     
      console.log("eeee");
      if(entrylist!=null ){
        console.log("bura iyi");
        entrylist.forEach(element => {
          var currentThread=new Thread();
          currentThread.username=element['username'];
          currentThread.topicid=element['topicName'];
          currentThread.content=element['content'];
          this.entries.push(currentThread);
        });
        
       }
      
    });
  
  }
  toTopic(url){

    this.router.navigateByUrl("/" + url);
  }

}
