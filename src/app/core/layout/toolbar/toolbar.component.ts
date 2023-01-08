import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  ricercaClienti() {
    this.router.navigate(['/cliente/search'], {queryParams: {operation:"search"}})
  }

  ricercaPizze() {
    this.router.navigate(['/pizza/search'], {queryParams: {operation:"search"}})
  }

  ricercaOrdini() {
    this.router.navigate(['/ordine/search'], {queryParams: {operation:"search"}})
  }

  toggle(): boolean {
    let disable: boolean = false;
    this.authService.getUserLogged().subscribe(res => {
      if (res?.role?.find(roleItem => roleItem == 'ROLE_FATTORINO')) {
        disable = true;
      }
      return disable;
    });
    return disable;
  }
}
