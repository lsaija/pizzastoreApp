import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Utente } from 'src/app/models/utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiServer = 'http://localhost:8080/api/utente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient,private authService:AuthService) { }

  getUtenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(`${this.apiServer}/listaUtenti`)
  }

  getUtente(id: number): Observable<Utente> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Utente>(url).pipe(
      tap(_ => console.log(`fetched Utente id=${id}`)),
      catchError(this.handleError<Utente>(`getUtente id=${id}`))
    );
  }

  /** POST: add a new regista to the server */
  addUtente(utenteInput: Utente): Observable<Utente> {
    return this.http.post<Utente>(this.apiServer, utenteInput, this.httpOptions).pipe(
      tap((newUtente: Utente) => console.log(`added utente w/ id=${newUtente.id}`)),
      catchError(this.handleError<Utente>('addUtente'))
    );
  }
  registraUtente(utenteInput: Utente): Observable<Utente> {
    return this.http.post<Utente>(`${this.apiServer}/registra`, utenteInput, this.httpOptions).pipe(
      tap((newUtente: Utente) => console.log(`added utente w/ id=${newUtente.id}`)),
      catchError(this.handleError<Utente>('addUtente'))
    );
  }
  delete(id?:number): Observable<Utente>{
    return this.http.delete<Utente>(this.apiServer + '/' + id, this.httpOptions).pipe(
      tap((deleteUtente: Utente) => console.log(`added Utente w/ id=${deleteUtente.id}`)),
      catchError(this.handleError<Utente>('deleteUtente'))
    )
    }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
