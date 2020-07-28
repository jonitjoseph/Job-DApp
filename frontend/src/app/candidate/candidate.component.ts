import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      age: new FormControl(null, { validators: [Validators.required] }),
      instName: new FormControl(null, { validators: [Validators.required] }),
      aNumber: new FormControl(null, { validators: [Validators.required] }),
      phNumber: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      qualification: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    console.log(this.form);
  }
}
