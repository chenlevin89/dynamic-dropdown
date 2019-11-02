import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownComponent} from './dropdown.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [DropdownComponent, SearchComponent, ListComponent],
  exports: [DropdownComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DropdownModule {}
