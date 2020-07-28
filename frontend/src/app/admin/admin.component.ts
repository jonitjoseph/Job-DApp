import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(42)],
      }),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Invalid Form Data');
      return;
    } else {
      console.log(this.form);
    }
  }
}
