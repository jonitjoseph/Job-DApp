import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
})
export class EmployerComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      companyName: new FormControl(null, { validators: [Validators.required] }),
      jobTitle: new FormControl(null, { validators: [Validators.required] }),
      jobCategory: new FormControl(null, { validators: [Validators.required] }),
      jobLocation: new FormControl(null, { validators: [Validators.required] }),
      lastDate: new FormControl(null, { validators: [Validators.required] }),
      jobType: new FormControl(null, { validators: [Validators.required] }),
      reward: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    console.log(this.form);
  }
}
