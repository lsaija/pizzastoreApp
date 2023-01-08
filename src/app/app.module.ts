import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardWelcomeComponent } from './components/card-welcome/card-welcome.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { ErrorInterceptor } from './core/error.interceptor';
import { LayoutModule } from './core/layout/layout.module';
import { ClienteModule } from './features/cliente/cliente.module';
import { OrdineModule } from './features/ordine/ordine.module';
import { PizzaModule } from './features/pizza/pizza.module';
import { IfRolesDirective } from './shared/directives/if-roles.directive';
import { IsLoggedDirective } from './shared/directives/is-logged.directive';
import { MaterialModule } from './shared/material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SnackbarComponent,
    CardWelcomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    PizzaModule,
    ClienteModule,
    OrdineModule,
    IfRolesDirective,
    LayoutModule,
    IsLoggedDirective


  ],

  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
