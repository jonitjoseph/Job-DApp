import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DappService } from '../service/dapp.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit {
  form: FormGroup;
  jobId;
  acc;

  constructor(
    private dapp: DappService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      age: new FormControl(null, { validators: [Validators.required] }),
      phNumber: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      instName: new FormControl(null, { validators: [Validators.required] }),
      qualification: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('jobId')) {
        this.jobId = paramMap.get('jobId');
      } else {
        this.jobId = null;
      }
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      if (this.jobId == null) {
        console.log('Cannot submit without jobid');
      } else {
        this.acc = await this.dapp.getCurrentAccount();
        const existingAddress = localStorage.getItem('address');
        const existingType = localStorage.getItem('type');
        if (existingAddress === this.acc && existingType === 'employer') {
          alert('Employer cannot enroll for job!');
        } else {
          localStorage.setItem('address', this.acc);
          localStorage.setItem('type', 'candidate');
          this.dapp.candidateApplication(
            this.jobId,
            this.form.value.name,
            this.form.value.age,
            this.form.value.phNumber,
            this.form.value.qualification
          );
          setTimeout(() => {
            this.router.navigate(['/']);
            this.form.reset();
          }, 1000);
        }
      }
    }
  }
}
