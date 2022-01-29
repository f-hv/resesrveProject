import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';





@NgModule({
  declarations: [
    ErrorMessageComponent,
    SearchBoxComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgMultiSelectDropDownModule
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  exports:[ErrorMessageComponent , SearchBoxComponent,HeaderComponent,SidebarComponent],
})
export class sharedModule { }
