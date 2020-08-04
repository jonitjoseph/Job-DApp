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
    console.log(this.jobId);
  }

  onSubmit() {
    console.log(this.form);
    console.log(this.jobId);
    if (this.form.invalid) {
      return;
    } else {
      if (this.jobId == null) {
        console.log('cannot submit without jobid');
      } else {
        this.dapp.candidateApplication(
          this.jobId,
          this.form.value.name,
          this.form.value.age,
          this.form.value.phNumber,
          this.form.value.qualification
        );
        console.log('application submitted successfully');
        this.form.reset();
        this.router.navigate(['/']);
      }
    }
  }
}
