import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { CoreModule } from './core/core.module';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NgModule } from '@angular/core';
import { PeopleComponent } from './components/people/people.component';
import { PeopleFilterPipe } from './pipes/people-filter.pipe';
import { PeopleHistoryComponent } from './components/people-history/people-history.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonResgisterComponent } from './components/person-resgister/person-resgister.component';
import { PersonSearchComponent } from './components/person-search/person-search.component';
import { PersonService } from './services/person.service';
import { SharedModule } from './shared/shared.module';

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
		CoreModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		ApiAuthorizationModule,
		AppRoutingModule,
		SharedModule
	],
	providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }, PersonService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
