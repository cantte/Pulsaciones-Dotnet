import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material.module';

@NgModule({
	declarations: [],
	imports: [ MaterialModule ],
	exports: [ MaterialModule ]
})
export class SharedModule {}
