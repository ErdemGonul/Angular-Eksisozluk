import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap,share } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
    
    
    return this.http.get('http://127.0.0.1:8080/topic/' + x);  
  }

  createUser(nick){
    const req = this.http.post('http://127.0.0.1:8080/user', {
      "username": nick
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
    createTopic(topicname,nick,thread){
      const req = this.http.post('http://127.0.0.1:8080/topic',
      {
        "name":topicname,
        "createdBy": nick
      }
      
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
        const req = this.http.post('http://127.0.0.1:8080/thread',
        {
          "content": thread,
          "topicName": topic,
          "username": nick
        }
      )
          .subscribe(
            res => {
             console.log(topic);
              console.log("iş tamamdır");
              window.location.replace("http:///localhost:4200/" + topic);
            },
            err => {
              console.log("Error occured");
            }
          );
      }
    ngOnInit(){
     
       
       
        
        
      
    }
}
