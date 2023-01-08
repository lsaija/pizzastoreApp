import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { DetailClienteComponent } from './detail-cliente/detail-cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { IfRolesDirective } from 'src/app/shared/directives/if-roles.directive';
import { IsLoggedDirective } from 'src/app/shared/directives/is-logged.directive';

const routes: Routes = [
  {
    path: 'list',
    component: ListClienteComponent
  },

  {
    path: ':id',
    component: DetailClienteComponent
  },

  {
    path: 'create',
    component: DetailClienteComponent
  },

  {
    path: 'edit/:id',
    component: DetailClienteComponent
  },
  {
    path: 'search',
    component: DetailClienteComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    ListClienteComponent,
    DetailClienteComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    IfRolesDirective,
    IsLoggedDirective
  ]
})
export class ClienteModule { }
