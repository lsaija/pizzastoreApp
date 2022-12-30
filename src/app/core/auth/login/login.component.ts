import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Utente } from 'src/app/models/utente';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  utente:Utente = {username:"", token:""}
  errormessage:string = ""

  destroy$:Subject<Boolean> = new Subject()


  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  login(utenteForm:NgForm){
    if(utenteForm.valid){
      this.authService.login(utenteForm.value).pipe(
        tap(ele => this.authService.setUserLogged(ele)),
        takeUntil(this.destroy$),
        switchMap(utente => {
          return this.authService.roles().pipe(
            map(ruoli => {
              return {
                username: utente.username,
                token: utente.token,
                role: ruoli
              }
            })
          )
        })
      ).subscribe(res =>{
        this.authService.setUserLogged(res);
        this.router.navigate([""])
      })
    }else{
      
    }
  }

}
