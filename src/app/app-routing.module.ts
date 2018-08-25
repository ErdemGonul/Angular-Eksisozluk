import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{TopicComponentComponent} from './topic-component/topic-component.component';
import{RegisterComponent} from './register/register.component';
import{CreatetopicComponent} from './createtopic/createtopic.component';
const routes: Routes = [
  
  { path: 'home', component:TopicComponentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createtopic', component:CreatetopicComponent},
  {path: ":id", component: TopicComponentComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {




  
}