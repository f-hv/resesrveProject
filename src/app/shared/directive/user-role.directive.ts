import { Directive,  Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[UserRoleEnum]'
})
export class UserRoleEnumDirective {
  @Input() inputRole: string;
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
  ngOnInit(): void {
    this.changeVisibility();
  }
  value: string = '';
  @Input() set UserRoleEnum(data: string) {
    this.value = data;
  }
  changeVisibility() {
    this.authService.currentUser$.subscribe((user: any) => {
      if (user && user?.role === this.value)
        this.viewContainer.createEmbeddedView(this.templateRef);
      else
        this.viewContainer.clear();
    })
  }
}
