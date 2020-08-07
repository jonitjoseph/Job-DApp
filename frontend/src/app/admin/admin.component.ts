import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DappService } from '../service/dapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  vEmployers = this.dapp.getVEmployers();

  constructor(private dapp: DappService, private router: Router) {}

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

  // Transfer the submited data, adding verified employer, to the createVerifiedEmployer in dapp service

  onSubmit() {
    if (this.form.invalid) {
      alert('Invalid Form Data');
      return;
    } else {
      console.log(this.form);
      this.dapp.createVerifiedEmployer(
        this.form.value.address,
        this.form.value.name
      );
      this.router.navigate(['/']);
      this.form.reset();
    }
  }
}
