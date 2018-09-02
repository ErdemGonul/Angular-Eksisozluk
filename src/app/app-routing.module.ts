import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{TopicComponentComponent} from './topic-component/topic-component.component';
import{RegisterComponent} from './register/register.component';
import{CreatetopicComponent} from './createtopic/createtopic.component';
import{SigninComponent} from './signin/signin.component';
import { UserentriesComponent } from 'src/app/userentries/userentries.component';
const routes: Routes = [
  {path : "",component:TopicComponentComponent},
  { path: 'home', component:TopicComponentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createtopic', component:CreatetopicComponent},
  {path: 'signin', component:SigninComponent},
  {path:"user/:user",component:UserentriesComponent},
  {path: ":id", component: TopicComponentComponent},
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {




  
}