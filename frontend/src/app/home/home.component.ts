import { Component, OnInit } from '@angular/core';
import { DappService } from '../service/dapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private dapp: DappService) {}
  jobs = this.dapp.getJobs();

  ngOnInit(): void {}
}
