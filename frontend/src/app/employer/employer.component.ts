import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DappService } from '../service/dapp.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
})
export class EmployerComponent implements OnInit {
  form: FormGroup;
  acc;

  constructor(private dapp: DappService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      evid: new FormControl(null, { validators: [Validators.required] }),
      companyName: new FormControl(null, { validators: [Validators.required] }),
      jobTitle: new FormControl(null, { validators: [Validators.required] }),
      jobLocation: new FormControl(null, { validators: [Validators.required] }),
      jobType: new FormControl(null, { validators: [Validators.required] }),
      reward: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  async onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    } else {
      this.dapp.createJob(
        this.form.value.evid,
        this.form.value.companyName,
        this.form.value.jobTitle,
        this.form.value.jobLocation,
        this.form.value.jobType,
        this.form.value.reward
      );
      this.acc = await this.dapp.getCurrentAccount();
      localStorage.setItem('address', this.acc);
      localStorage.setItem('type', 'employer');
      setTimeout(() => {
        this.router.navigate(['/']);
        this.form.reset();
      }, 1000);
    }
  }
}
