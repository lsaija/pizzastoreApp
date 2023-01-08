import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { IsLoggedDirective } from 'src/app/shared/directives/is-logged.directive';
import { IfRolesDirective } from 'src/app/shared/directives/if-roles.directive';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    IfRolesDirective
  ],
  exports:[
    ToolbarComponent
  ]
})
export class LayoutModule { }
