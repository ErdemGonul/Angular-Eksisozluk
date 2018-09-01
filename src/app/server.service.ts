import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap,share } from 'rxjs/operators';
import { DebugContext } from '@angular/core/src/view';

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
  constructor(private router:Router,  private http: HttpClient) { 
    
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
    console.log(x);
    
    return this.http.get('http://127.0.0.1:8080/topic/' + x);  
  }
  signControl(nick,password){
   
    console.log(".agıırram");
    const req = this.http.post('http://127.0.0.1:8080/login',{}
    ,httpOptions
    
  )
      .subscribe(
        res => {
         console.log("signed in as ",nick);
         var token="Basic" + btoa(nick+":"+password);
          localStorage.setItem("signed",JSON.stringify({ "nick": nick, "token": token}));
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
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    }
    createTopic(topicname,nick,password,thread){
      httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(nick+":"+password));
      console.log(btoa("user:user"));
      const req = this.http.post('http://127.0.0.1:8080/topic',
      {
        "name":topicname,
        "createdBy": nick
      },httpOptions
      
    )
        .subscribe(
          res => {
           
            console.log(res);
            
            this.createThread(nick,thread,topicname)
            //window.location.replace("http://localhost:4200");
          },
          err => {
            console.log("Error occured");
          }
        );
      }

      createThread(nick,thread,topic){
        httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(nick+":rup"));
        console.log(httpOptions.headers[0]);
        const req = this.http.post('http://127.0.0.1:8080/thread',
        {
          "content": thread,
          "topicName": topic,
          "username": nick
        },httpOptions
      )
          .subscribe(
            res => {
            console.log(topic);
             
            window.location.replace("http:///localhost:4200/" + topic);
            },
            err => {
              console.log("Error occured");
            }
          );
      }
      like(){
        console.log("beğeniye giriş");
        const req = this.http.post('http://127.0.0.1:8080/likethread/3',{}
        ,httpOptions
        
      )
          .subscribe(
            res => {
             console.log("begendim",res);
             
            },
            err => {
              console.log("Couldnt liked.");
            }
          );
        }
    
      
    ngOnInit(){
     
      
       
        
        
      
    }
}
