import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[isLogged]',
  standalone: true,
})
export class IsLoggedDirective {

  @Input() set isLogged(isloggedIn: boolean){

    if(!isloggedIn){
      this.elementRef.nativeElement.style.display='none';
    }else{
      this.elementRef.nativeElement.style.display='block';
    }

  }


  constructor(private elementRef:ElementRef) { }

}
