import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do-info',
  templateUrl: './to-do-info.component.html',
})
export class ToDoInfoComponent implements OnInit {

  constructor() { }

  toDoForm = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
  });

  ngOnInit() {
  }

  save(): void {
    
  }
}
