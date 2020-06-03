import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { PeopleComponent } from './components/people/people.component';
import { PeopleHistoryComponent } from './components/people-history/people-history.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonSearchComponent } from './components/person-search/person-search.component';
import { PersonResgisterComponent } from './components/person-resgister/person-resgister.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonService } from './services/person.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PeopleFilterPipe } from './pipes/people-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PeopleComponent,
    PeopleHistoryComponent,
    PersonDetailComponent,
    PersonSearchComponent,
    PersonResgisterComponent,
    PeopleFilterPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
