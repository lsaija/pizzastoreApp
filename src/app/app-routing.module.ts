import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./features/cliente/cliente.module').then(m => m.ClienteModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'pizza',
    loadChildren: () => import('./features/pizza/pizza.module').then(m => m.PizzaModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'ordine',
    loadChildren: () => import('./features/ordine/ordine.module').then(m => m.OrdineModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
  },

  { path:'', 
    redirectTo:'login',pathMatch:'full'
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
