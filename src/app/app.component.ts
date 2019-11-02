import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {options} from './app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ddFromControl = new FormControl();

  dropdownOptions = options;

  ngOnInit() {
    this.ddFromControl.valueChanges.subscribe(console.log);
  }
}

