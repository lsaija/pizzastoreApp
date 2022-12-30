import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Directive({
  selector: '[appIfRoles]'
})
export class IfRolesDirective {

  private subscription: Subscription[] = [];
  // the role the user must have
  @Input() public appIfRoles: string | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rolesService: AuthService
  ) {}

    ruolo: string | null | undefined;

  public ngOnInit(): void {
    this.ruolo = this.rolesService.getUserRoles();

    if (!this.ruolo) {
      // Remove element from DOM
      this.viewContainerRef.clear();
    }
    // user Role are checked by a Roles mention in DOM
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

}