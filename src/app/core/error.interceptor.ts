import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
//import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

export interface ErroreResponse {
  message: any;
  status: any;
  url: string;
  error: any;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,/* private snackbarService: SnackbarService*/) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => this.checkError(err, request)!)
    );
  }

  checkError(err: any, request: any) {
    let error = { message: err.error.message, status: err.status, url: '/', error: err };

    if (err) {
      switch (err.status) {
        case 401: {
          this.authService.logout();
          error = { message: 'Sessione scaduta', status: err.status, url: request.url, error: err };
          break;
        }
        case 403: {
          error = { message: 'Utente non autorizzato ad utilizzare la funzione', status: err.status, url: request.url, error: err };
          break;
        }
        case 404: {
          error = { message: err.error.message, status: err.status, url: request.url, error: err };
          break;
        }
        case 422: {
          error = { message: err.error.message, status: err.status, url: request.url, error: err };
          break;
        }
        case 500: {
          error = { message: err.error.message, status: err.status, url: request.url, error: err };
          break;
        }
        case 0: {
          if (err.message && err.message.indexOf('unknown url') !== -1) {
            error = { message: 'Servizio non disponibile', status: err.status, url: request.url, error: err };
            break;
          }
          error = { message: 'Errore interno generico', status: err.status, url: '/', error: err };
          break;
        }
        default: {
          error = { message: 'Errore interno generico', status: err.status, url: '/', error: err };
          break;
        }
      }
    }
  /*  this.snackbarService.openErrorSnackBar(error);
    return throwError(() => new Error(error.message));*/
}
}