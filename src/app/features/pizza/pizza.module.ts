import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPizzaComponent } from './list-pizza/list-pizza.component';
import { DetailPizzaComponent } from './detail-pizza/detail-pizza.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { IfRolesDirective } from 'src/app/shared/directives/if-roles.directive';
import { IsLoggedDirective } from 'src/app/shared/directives/is-logged.directive';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPizzaComponent
  },

  {
    path: ':id',
    component: DetailPizzaComponent
  },

  {
    path: 'create',
    component: DetailPizzaComponent
  },

  {
    path: 'edit/:id',
    component: DetailPizzaComponent
  },

  {
    path: 'search',
    component: DetailPizzaComponent
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    ListPizzaComponent,
    DetailPizzaComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    IfRolesDirective,
    IsLoggedDirective,
    
  ]
})
export class PizzaModule { }
