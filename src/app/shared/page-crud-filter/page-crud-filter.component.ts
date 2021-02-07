import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-crud-filter',
  templateUrl: './page-crud-filter.component.html',
  styleUrls: ['./page-crud-filter.component.css']
})
export class PageCrudFilterComponent implements OnInit {

  @Output()
  filter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
