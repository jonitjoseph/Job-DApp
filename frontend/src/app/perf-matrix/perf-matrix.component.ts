import { Component, OnInit } from '@angular/core';
import { DappService } from '../service/dapp.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perf-matrix',
  templateUrl: './perf-matrix.component.html',
  styleUrls: ['./perf-matrix.component.css'],
})
export class PerfMatrixComponent implements OnInit {
  jobId;
  candAddress;
  form: FormGroup;
  jobDetails;
  empAddress;
  perfDetails;

  constructor(
    private dapp: DappService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the route parameters and store

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('candAddress') && paramMap.has('jobId')) {
        this.candAddress = paramMap.get('candAddress');
        this.jobId = paramMap.get('jobId');
      } else {
        this.jobId = null;
        this.candAddress = null;
      }
    });
    console.log(this.candAddress, '   ', this.jobId);
    this.form = new FormGroup({
      perfMatrix: new FormControl(null, {
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
    });
  }

  // Transfer the submited data, adding performance matrix of a candidate for a job, to the perfMatrix in dapp service

  async onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      if (this.empAddress == null) {
        alert('Get job details first!');
      } else {
        this.dapp.perfMatrix(
          this.candAddress,
          this.empAddress,
          this.jobId,
          this.form.value.perfMatrix
        );
        setTimeout(() => {
          this.router.navigate(['/']);
          this.form.reset();
        }, 1000);
      }
    }
  }

  // Retrieve the specific job details.
  // calling getSpecificJobDetails from dapp service.

  async getJobDetails(jobId) {
    this.jobDetails = await this.dapp.getSpecificJobDetails(jobId);
    this.empAddress = this.jobDetails.address;
  }

  // Retrieve the specific performance matrix details.
  // calling getPerfMatrix from dapp service.

  async getPerfMatrix(jobId) {
    if (this.empAddress == null) {
      alert('Get job details first!');
    } else {
      this.perfDetails = await this.dapp.getPerfMatrix(jobId);
    }
  }
}
