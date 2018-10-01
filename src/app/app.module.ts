import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { TopicComponentComponent } from './topic-component/topic-component.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CreatetopicComponent } from './createtopic/createtopic.component';
import { TopicsComponent } from './topics/topics.component';
import {ServerService} from './server.service';
import { ThreadcreatorComponent } from './threadcreator/threadcreator.component';
import { SigninComponent } from './signin/signin.component';
import { UserentriesComponent } from './userentries/userentries.component';
@NgModule({
  declarations: [
    AppComponent,
    TopicComponentComponent,
    RegisterComponent,
    CreatetopicComponent,
    TopicsComponent,
    ThreadcreatorComponent,
    SigninComponent,
    UserentriesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
