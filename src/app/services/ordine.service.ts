import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Ordine } from '../models/ordine';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  private apiServer = 'http://localhost:8080/api/ordine';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { }

  getOrdini(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(this.apiServer)
  }

  getOrdine(id: number): Observable<Ordine> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Ordine>(url).pipe(
      tap(_ => console.log(`fetched Ordine id=${id}`)),
      catchError(this.handleError<Ordine>(`getOrdine id=${id}`))
    );
  }

  addOrdine(ordineInput: Ordine): Observable<Ordine> {
    return this.http.post<Ordine>(this.apiServer, ordineInput, this.httpOptions).pipe(
      tap((newOrdine: Ordine) => console.log(`added ordine w/ id=${newOrdine.id}`)),
      catchError(this.handleError<Ordine>('addOrdine'))
    );
  }

  editOrdine(ordineInput:Ordine):Observable<Ordine> {
    return this.http.put<Ordine>(this.apiServer + '/' + ordineInput.id?.toString()!, ordineInput, this.httpOptions).pipe(
      catchError(this.handleError<Ordine>('editOrdine')));
  }

  delete(id?:number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiServer}/${id}`, this.httpOptions)
    ; 
  }

  
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
