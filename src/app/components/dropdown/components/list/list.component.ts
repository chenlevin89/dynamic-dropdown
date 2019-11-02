import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() options: any[] = [];
  @Input() templateRef: TemplateRef<any>;
  @Input() selected: any;

  @Output() selectChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
