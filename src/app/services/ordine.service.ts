import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Ordine } from '../models/ordine';
import { Pizza } from '../models/pizza';
import { Statistiche } from '../models/statistiche';
import { Utente } from '../models/utente';
import { PizzaService } from './pizza.service';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  private apiServer = 'http://localhost:8080/api/ordine';
  private apiServer2='http://localhost:8080/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  

  constructor(private http: HttpClient,pizzaService:PizzaService) { }

  getOrdini(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(this.apiServer+'/ordineInfo')
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

  search(example: Ordine): Observable<Ordine[]> {
    return this.http.post<Ordine[]>(this.apiServer + "/search", example, this.httpOptions);
  }

  getFattorini() : Observable<Utente[]> {
    return this.http.get<Utente[]>(this.apiServer2 + "/utente/fattorini");
  }

  getOrdiniFattorino(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(this.apiServer + "/fattorino");
  }


  getRicaviTotali(dateInput: Statistiche): Observable<number> {
    return this.http.post<number>(this.apiServer + "/ricaviIntervallo", dateInput, this.httpOptions );
  }

  getOrdiniTotali(dateInput: Statistiche): Observable<number> {
    return this.http.post<number>(this.apiServer + "/numeroOrdiniIntervallo", dateInput, this.httpOptions );
  }

  getPizzeTotali(dateInput: Statistiche): Observable<number> {
    return this.http.post<number>(this.apiServer + "/numeroPizzeOrdinate", dateInput, this.httpOptions );
  }

  getClientiVirtuosi(dateInput: Statistiche): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(this.apiServer2 + "/cliente/searchVirtuosi", dateInput, this.httpOptions);
  }

  getOrdiniIntervalloClienteConPizza(dateInput:Statistiche,clienteId:number,pizzaId:number){
    return this.http.post<Ordine[]>(this.apiServer + "/OrdiniClienteIntervalloPizza",this.httpOptions);
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
