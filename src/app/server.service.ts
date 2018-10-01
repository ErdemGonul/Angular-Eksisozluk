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
  private theBoolean: BehaviorSubject<boolean>;

  firstenter=true;
  baseUrl="http://127.0.0.1:8080/";


  constructor(private router:Router,  private http: HttpClient) { 
    this.theBoolean = new BehaviorSubject<boolean>(false);
      this.signed=JSON.parse(localStorage.getItem("signed"));
      if(this.signed!=null)
      httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(this.signed.username+ ":" +this.signed.password)); 
  }
  ngOnInit(){

  }

  public setTheBoolean(newValue: boolean): void {
    this.theBoolean.next(newValue);
  }
  public getTheBoolean(): Observable<boolean> {
    return this.theBoolean.asObservable();
  }
  signControl(nick,password){
    httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(nick + ":" + password));
    console.log(".agıırram");
    const req = this.http.post(this.baseUrl +'login',{},httpOptions).subscribe(
        res => {
          var token="Basic" + btoa(nick+": "+password);
          localStorage.setItem("signed",JSON.stringify({ "username": nick,"password":password, "token": token})); 
          this.signed=JSON.parse(localStorage.getItem("signed"));
          if(this.signed!=null){
          httpOptions.headers= httpOptions.headers.set('Authorization',"Basic " + btoa(this.signed.username + ":" + this.signed.password)); 
          this.router.navigateByUrl('/');
        }},
        err => {
          console.log("Couldnt signed.");
        }
      );
    }

  createUser(nick,password){
    const req = this.http.post(this.baseUrl + 'user', {
      "username": nick,
      "password": password
    })
      .subscribe(
        res => {
          console.log("yaratıldı");
        },
        err => {
          console.log("yaradamadım");
        }
      );
    }

    createTopic(topicname,thread){
     
      const req = this.http.post(this.baseUrl +'topic',
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

        const req = this.http.post(this.baseUrl +'thread',
        {
          "content": thread,
          "topicName": topic,
          "username": this.signed.username
        },httpOptions
        )
        .subscribe(
            res => {
             window.location.reload();
            },
            err => {
              console.log("Error occured");
            });
      }
    like(threadid){
        
      const req = this.http.post(this.baseUrl+'likethread/' + threadid,{}
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
    readThreadsFromUser(username,page):Observable<any>{
      return this.http.get(this.baseUrl+"thread/" + username + "?page=" + 0);
    }
    getTopics():Observable<any>{
      console.log("ehh");
      return this.http.get(this.baseUrl +'topics');
    }
    readMostRecentlyUpdatedTopics(): Observable<any>{
      return this.http.get<any>(this.baseUrl + 'topics/recent');
    }
  
    readRecentThreads(): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'threads/recent?page=0');
    }
  
    getThreads(x:string,page:number):Observable<any>{
      page--;
      return this.http.get(this.baseUrl +'topic/' + x + '?page=' + page);  
    }
}
