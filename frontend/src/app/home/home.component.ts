import { Component, OnInit } from '@angular/core';
import { DappService } from '../service/dapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  jobs = this.dapp.getJobs();
  constructor(private dapp: DappService) {}

  ngOnInit(): void {
    
    this.getjobnumber();
  }

  async getjobnumber() {
    this.jobs = this.dapp.getJobs();
    // console.log(this.jobs);
  }
}
