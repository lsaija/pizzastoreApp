import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiServer = 'http://localhost:8080/api/pizza';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { }

  getPizze(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiServer)
  }

  getPizza(id: number): Observable<Pizza> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Pizza>(url).pipe(
      tap(_ => console.log(`fetched Pizza id=${id}`)),
      catchError(this.handleError<Pizza>(`getPizza id=${id}`))
    );
  }

  addPizza(pizzaInput: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiServer, pizzaInput, this.httpOptions).pipe(
      tap((newPizza: Pizza) => console.log(`added pizza w/ id=${newPizza.id}`)),
      catchError(this.handleError<Pizza>('addPizza'))
    );
  }

  editPizza(pizzaInput:Pizza):Observable<Pizza> {
    return this.http.put<Pizza>(this.apiServer + '/' + pizzaInput.id?.toString()!, pizzaInput, this.httpOptions).pipe(
      catchError(this.handleError<Pizza>('editPizza')));
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
