import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		BrowserAnimationsModule
	],
	exports: [ BrowserAnimationsModule, CommonModule ]
})
export class CoreModule {
	static forRoot(): ModuleWithProviders<CoreModule> {
		return {
			ngModule: CoreModule
		};
	}
}
