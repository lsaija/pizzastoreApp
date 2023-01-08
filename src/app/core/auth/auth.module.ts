import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { IsLoggedDirective } from 'src/app/shared/directives/is-logged.directive';
import { IfRolesDirective } from 'src/app/shared/directives/if-roles.directive';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    IsLoggedDirective,
    IfRolesDirective
  ],
  exports:[
    LoginComponent
    
  ]
})
export class AuthModule { }
