import { Component, OnInit, Renderer2  } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  account : Account;
  constructor(config: NgbCarouselConfig, private router: Router, private dataService: DataService, private renderer: Renderer2) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  navigateToHome(){
    this.account = this.dataService.getDataPersistent('account');
    if (this.account == null) {
      this.router.navigate(['/index']);
    } else if (this.account.role.roleName === "ADMIN"){
      this.router.navigate(['/dashboard']);
    } else if (this.account.role.roleName === "USER"){
      this.router.navigate(['/user-dashboard']);
    }
  }
  ngOnInit(): void {
    this.loadBootstrapCSS();
    this.loadBootstrapJS();
    }

  loadBootstrapCSS() {
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'href', 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    document.head.appendChild(link);
  }

  loadBootstrapJS() {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'src', 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.min.js');
    document.body.appendChild(script);
  }
}
