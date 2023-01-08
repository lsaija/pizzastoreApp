import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-card-welcome',
 
  templateUrl: './card-welcome.component.html',
  styleUrls: ['./card-welcome.component.css']
})
export class CardWelcomeComponent {
    
  @Input() cardTitle!: string;
  @Input() cardBody!: string;
  @Input() cardLink!: string;


  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navigateFunction(){
    this.route.navigateByUrl(this.cardLink);
  }

}
