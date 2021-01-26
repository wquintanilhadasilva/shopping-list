import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageCrudComponent } from './page-crud/page-crud.component';
import { PageCrudEditComponent } from './page-crud-edit/page-crud-edit.component';
import { PageCrudListComponent } from './page-crud-list/page-crud-list.component';
import { PageCrudFilterComponent } from './page-crud-filter/page-crud-filter.component';



@NgModule({
  declarations: [
    PageHeaderComponent,
    PageTitleComponent,
    PageFooterComponent,
    PageCrudComponent,
    PageCrudEditComponent,
    PageCrudListComponent,
    PageCrudFilterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
