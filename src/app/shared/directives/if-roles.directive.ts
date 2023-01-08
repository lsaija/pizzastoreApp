import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Directive({
  selector: '[appIfRoles]',
  standalone: true,
  
})
export class IfRolesDirective {

  @Input() set appIfRoles(roles: string[]) {
    this.authService.getUserLogged().subscribe(res => {
      for(let roleItem of roles) {
      if(res?.role?.find(ruolo => ruolo === roleItem)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    }
    })
  }

  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

}