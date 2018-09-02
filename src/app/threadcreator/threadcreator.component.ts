import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { Input } from '@angular/core';
import { TopicComponentComponent } from 'src/app/topic-component/topic-component.component';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-threadcreator',
  templateUrl: './threadcreator.component.html',
  styleUrls: ['./threadcreator.component.css']
})
export class ThreadcreatorComponent implements OnInit {
  @Input() topicComponent: TopicComponentComponent;
  nick:string;
  thread:string;
  @Output() myEvent = new EventEmitter<string>();

  callParent() {
    console.log("yapıyop z bişiler");
    this.myEvent.emit('eventDesc');
  }
  constructor(private serverservice:ServerService) { }

  ngOnInit() {
  
  }

  sendEntry(){
    
    this.serverservice.createThread(this.nick,this.thread,this.serverservice.topicid);
    this.callParent();
    this.nick="";
    this.thread="";
  }

}
