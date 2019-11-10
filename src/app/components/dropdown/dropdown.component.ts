import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject, BehaviorSubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {SearchComponent} from './components/search/search.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent
    }
  ]
})
export class DropdownComponent implements OnDestroy, ControlValueAccessor {

  @ViewChild(SearchComponent, {read: SearchComponent, static: false}) search: SearchComponent;

  @Input() set options(value: any[]) {
    this.sourceOptions = value;
    this.displayedOptions$.next(value);
  }
  @Input() templateRef: TemplateRef<any>;

  displayedOptions$ = new BehaviorSubject<any[]>([]);
  toggle = false;
  selected = new FormControl();
  disabled$ = new BehaviorSubject<boolean>(false);

  private sourceOptions: any[] = [];
  private onDestroy$ = new Subject();

  constructor(private cdr: ChangeDetectorRef) {}


  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  searchChanged(term: string): void {
    const filteredOptions = isNullOrUndefined(term) || term === '' ?
      [...this.sourceOptions] :
      this.sourceOptions
        .filter(option => Object.values(option)
          .some(value => value.toString().toLowerCase().indexOf(term.toLowerCase()) !== -1));
    this.displayedOptions$.next(filteredOptions);
  }

  selectChanged(option: any): void {
    this.selected.setValue(option);
    this.toggle = false;
    this.search.clear();
  }

  writeValue(obj: any): void {
    this.selected.setValue(obj);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.selected.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled$.next(isDisabled);
  }

}
