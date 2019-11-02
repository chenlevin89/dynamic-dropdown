import {Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil, debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() searchChanged = new EventEmitter<string>();

  searchControl = new FormControl();
  private onDestroy$ = new Subject();

  constructor() {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => this.searchChanged.emit(value));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  clear(): void {
    this.searchControl.setValue(null);
  }

}
