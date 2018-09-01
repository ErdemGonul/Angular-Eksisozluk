import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from '../server.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  nick;
  password;

  constructor(private router: Router,private server:ServerService) { }

  ngOnInit() {
  }

  signFunc(){
 
  }

}
