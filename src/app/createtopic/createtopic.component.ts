import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from '../server.service';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-createtopic',
  templateUrl: './createtopic.component.html',
  styleUrls: ['./createtopic.component.css']
})
export class CreatetopicComponent implements OnInit {


  topicname;
  firstthreadname;
  nick;
  password;
  constructor(private router: Router,private server:ServerService) { 
    }


  ngOnInit() {
  }


  topicCreateFunc(){

    this.server.createTopic(this.topicname,this.nick,this.password,this.firstthreadname);
    console.log("cagırdım");
    //window.location.replace("http://localhost:4200");
    
  }
}



