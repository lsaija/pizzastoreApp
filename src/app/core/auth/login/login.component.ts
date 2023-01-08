import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Utente } from 'src/app/models/utente';
import { AuthService } from '../auth.service';

export interface LoginForm extends FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
}>{}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  utente?:Utente;
  errormessage:string = ""

  destroy$:Subject<Boolean> = new Subject()


  constructor(private router:Router, private authService:AuthService,private fb: FormBuilder) { }

  userReactive: LoginForm = this.fb.group({
    username: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  onClick(): void {
    this.authService.login(this.userReactive.getRawValue()).pipe(
      takeUntil(this.destroy$)
      ).subscribe(res => {
        this.authService.setUserLogged(res);
    });
  }

}
