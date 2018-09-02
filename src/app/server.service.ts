import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap,share } from 'rxjs/operators';
import { DebugContext } from '@angular/core/src/view';
import { Subject } from 'rxjs/internal/Subject';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic dXNlcjp1c2Vy',
    'Content-Type':  'application/json'
    
  })
};
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  topiclist:string[]=[];
  topicid:string;
  signed;
  callTopicComponent=new Subject<any>();
  componentcalled=this.callTopicComponent.asObservable();


  callComponent(){
    this.callTopicComponent.next();
  }

  constructor(private router:Router,  private http: HttpClient) { 
      this.signed=JSON.parse(localStorage.getItem("signed"));
      httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(this.signed.username+ ":" +this.signed.password)); 
  }
  signControl(nick,password){
    httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(nick + ":" + password));
    console.log(".agıırram");
    const req = this.http.post('http://127.0.0.1:8080/login',{},httpOptions).subscribe(
        res => {
          var token="Basic" + btoa(nick+": "+password);
          localStorage.setItem("signed",JSON.stringify({ "username": nick,"password":password, "token": token})); 
          this.signed=JSON.parse(localStorage.getItem("signed"));
          httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(this.signed.username + ":" + this.signed.password)); 
          this.router.navigateByUrl('/');
        },
        err => {
          console.log("Couldnt signed.");
        }
      );
    }


  

  createUser(nick,password){
    const req = this.http.post('http://127.0.0.1:8080/user', {
      "username": nick,
      "password": password
    })
      .subscribe(
        res => {},
        err => {
          console.log("Error occured");
        }
      );
    }

    createTopic(topicname,thread){
     
      const req = this.http.post('http://127.0.0.1:8080/topic',
      {
        "name":topicname,
        "createdBy": this.signed.username
      },httpOptions
    )
        .subscribe(
          res => {
            this.topicid=topicname;
            this.createThread(thread,topicname)
            this.router.navigateByUrl(topicname);
          },
          err => {
            console.log("Error occured");
          });
      }

      createThread(thread,topic){

        const req = this.http.post('http://127.0.0.1:8080/thread',
        {
          "content": thread,
          "topicName": topic,
          "username": this.signed.username
        },httpOptions
      )
          .subscribe(
            res => {
             this.callComponent();
            },
            err => {
              console.log("Error occured");
            });
      }

      
    
      
    ngOnInit(){

    }
    like(threadid){
        
      const req = this.http.post('http://127.0.0.1:8080/likethread/' + threadid,{}
      ,httpOptions        
    )
        .subscribe(
          res => {
           console.log("begendim",res);
          },
          err => {
            console.log("Couldnt liked.");
          });
      }
    readThreadsFromUser(username):Observable<any>{
      return this.http.get("http://127.0.0.1:8080/thread/" + username);
    }
    getTopics():Observable<any>{
      return this.http.get('http://127.0.0.1:8080/topics').pipe(
  
      map( result => {
        
          let data = JSON.stringify(result);
          var x=JSON.parse(data);
  
          for (var i = 0, l = x.length; i < l; i++) {
            if(!this.topiclist.includes(x[i].name)){
            var obj = x[i].name;
            this.topiclist.push(obj);
            let urlTree = this.router.createUrlTree([obj]);
        }}
       return result;
      })
      );
    }
    getThreads(x:string):Observable<any>{
      return this.http.get('http://127.0.0.1:8080/topic/' + x);  
    }
}
