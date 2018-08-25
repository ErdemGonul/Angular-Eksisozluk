import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  topiclist=[];
  topicid:string;
  constructor(  private http: HttpClient) { }
  getTopics():Observable<any>{
    
    return this.http.get('http://127.0.0.1:8080/topics');

  }
  getThreads():Observable<any>{
  
    console.log( this.topicid , "heyy");
    return this.http.get('http://127.0.0.1:8080/topic/' + this.topicid);
    
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
    createTopic(topicname,nick){
      const req = this.http.post('http://127.0.0.1:8080/topic',
      {
        "name":topicname,
        "createdBy": nick
      }
    )
        .subscribe(
          res => {
           
            console.log(res);
          },
          err => {
            console.log("Error occured");
          }
        );
      }
    
}