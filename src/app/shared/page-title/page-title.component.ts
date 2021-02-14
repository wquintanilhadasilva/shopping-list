import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  @Input()
  title?: string | null = null;

  public get hasTitle(): boolean {
    return this.title != null ? true : false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
