import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrdineComponent } from './list-ordine/list-ordine.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { DetailOrdineComponent } from './detail-ordine/detail-ordine.component';
import { IfRolesDirective } from 'src/app/shared/directives/if-roles.directive';
import { IsLoggedDirective } from 'src/app/shared/directives/is-logged.directive';

const routes: Routes = [
  {
    path: 'list',
    component: ListOrdineComponent
  },
  {
    path: 'fattorino',
    component: ListOrdineComponent
  },

  {
    path: ':id',
    component: DetailOrdineComponent
  },

  {
    path: 'create',
    component: DetailOrdineComponent
  },

  {
    path: 'edit/:id',
    component: DetailOrdineComponent
  },

  {
    path: 'search',
    component: DetailOrdineComponent
  },


  {
    path: 'report',
    component: DetailOrdineComponent
  },

  {
    path: 'statistiche',
    component: DetailOrdineComponent
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    ListOrdineComponent,
    DetailOrdineComponent,
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
export class OrdineModule { }
