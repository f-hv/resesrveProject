import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { sharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModule } from './login/login.module';
import { RegisterUserModule } from './register-user/register-user.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    sharedModule,
    CoreModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    NgbModule,
    LoginModule,
    RegisterUserModule,
    ToastrModule.forRoot(),
  ],
  schemas:[NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
