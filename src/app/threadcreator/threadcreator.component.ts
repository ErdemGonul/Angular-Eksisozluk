import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { Input } from '@angular/core';
import { TopicComponentComponent } from 'src/app/topic-component/topic-component.component';
import { Output } from '@angular/core';


@Component({
  selector: 'app-threadcreator',
  templateUrl: './threadcreator.component.html',
  styleUrls: ['./threadcreator.component.css']
})
export class ThreadcreatorComponent implements OnInit {
  @Input() topicComponent: TopicComponentComponent;
  thread:string;

  constructor(private serverservice:ServerService) { }

  ngOnInit() {
  
  }

  sendEntry(){
    this.serverservice.createThread(this.thread,this.serverservice.topicid);
    this.thread="";
  }

}
