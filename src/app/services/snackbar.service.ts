import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { ErroreResponse } from '../core/error.interceptor';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

 
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(data: string, panelClass: string[]) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      verticalPosition: 'top',
      panelClass,
      duration: 3000
    });
  }

  openErrorSnackBar(errore: ErroreResponse) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: errore.message,
      panelClass: ['red']
    });
  }
}
