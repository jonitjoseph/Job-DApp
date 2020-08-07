import { Component, OnInit } from '@angular/core';
import { DappService } from '../service/dapp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dapp: DappService) {}
  currentUser;

  async ngOnInit(): Promise<void> {

    // Retrieve the current address of the user provided by metamask.
    // Calling getCurrentAccount from dapp service.

    this.currentUser = await this.dapp.getCurrentAccount();
  }
}
