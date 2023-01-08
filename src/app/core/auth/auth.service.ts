import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Utente } from 'src/app/models/utente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = 'http://localhost:8080/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient, private router: Router) { }
  

  private userLoggedSubject$: BehaviorSubject<Utente | null> = new BehaviorSubject<Utente | null>(null)

  login(loginForm: Utente): Observable<Utente> {
    return this.http.post<{'jwt-token': string}>(this.apiServer + "/auth/login", JSON .stringify(loginForm), this.httpOptions).pipe(
      switchMap(res => of({ username: loginForm.username, token: res['jwt-token'] }))
    );
  }

  setUserLogged(user: Utente | null) {
    this.userLoggedSubject$.next(user);
    if(user != null) {
    this.getUserRoles().subscribe({
      next: res => user!.role = res.roles,
      complete: () => {
        this.userLoggedSubject$.next(user);
        if(user.role?.find(role => role === "ROLE_FATTORINO")){
          this.router.navigate(["/ordine/list"], {queryParams: {fattorino: "true"}});
        } else {
          this.router.navigateByUrl("welcome");
        }
      }
    });
  }
  }

  getUserLogged(): Observable<Utente | null> {
    return this.userLoggedSubject$.asObservable();
  }

  getUserRoles(): Observable<{roles: string[]}> {
    return this.http.get<{roles: string[]}>(this.apiServer + "/utente/userInfo");
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToken(): string | null | undefined  {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  logout() {    
    this.setUserLogged(null);
  }

}

