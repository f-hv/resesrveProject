import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ErrorMessageComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ErrorMessageComponent , SearchBoxComponent]
})
export class sharedModule { }
