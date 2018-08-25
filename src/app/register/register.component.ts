import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from '../server.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nick:string;

  constructor(private router: Router,private server:ServerService) { }

  ngOnInit() {
  }

  registerFunc(){
    
      this.server.createUser(this.nick);
      console.log("cagırdım");
    this.router.navigateByUrl('');
  }

}
