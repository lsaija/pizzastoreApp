import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiServer = 'http://localhost:8080/api/cliente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { }

  getClienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiServer)
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`fetched Cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  addCliente(clienteInput: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiServer, clienteInput, this.httpOptions).pipe(
      tap((newCliente: Cliente) => console.log(`added cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  editCliente(clienteInput:Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiServer + '/' + clienteInput.id?.toString()!, clienteInput, this.httpOptions).pipe(
      catchError(this.handleError<Cliente>('editCliente')));
  }

  delete(id?:number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiServer}/${id}`, this.httpOptions)
    ; 
  }

  search(example: Cliente): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(this.apiServer + "/search", example, this.httpOptions);
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
