import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { PersonResgisterComponent } from './components/person-resgister/person-resgister.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  { path: 'register', component: PersonResgisterComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'person/:id', component: PersonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
