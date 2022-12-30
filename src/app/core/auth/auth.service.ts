import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Utente } from 'src/app/models/utente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = 'http://localhost:8080/api/auth/login';
  private apiServerUtente = 'http://localhost:8080/api/utente/userInfo';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  private userLoggedSubject$: BehaviorSubject<Utente | null> = new BehaviorSubject<Utente | null>(null);

  login(loginForm: Utente): Observable<Utente> {
    return this.http.post<{'jwt-token': string}>(this.apiServer, JSON .stringify(loginForm), this.httpOptions).pipe(
      switchMap(res => of({ username: loginForm.username, token: res['jwt-token'] }))
    );
  }

  roles(): Observable<string> {
    return this.http.get<{ roles: string }>(this.apiServerUtente).pipe(map(res => res.roles));
  }

  setUserLogged(utente:Utente | null) {
    this.userLoggedSubject$.next(utente);
  }

  getUserLogged(): Observable<Utente | null> {
    return this.userLoggedSubject$.asObservable();
  }

  getUserRoles(): string | null | undefined{
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.role : null;
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToken(): string | null | undefined {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  logout() {
    this.setUserLogged(null);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      err.error?.errors?.forEach((element: { message: string; }) => {
        errorMessage += element.message;
      });
    }
    console.error(errorMessage);
  }
}

