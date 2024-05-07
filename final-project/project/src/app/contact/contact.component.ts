import { Component, OnInit, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Account } from '../model/account';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

form: FormGroup = this.fb.group({
  from_email: '',
  message: ''
});

constructor(private router: Router, private dataService: DataService, private fb: FormBuilder, private renderer: Renderer2) { }

account : Account;

  navigateToHome(){
    this.account = this.dataService.getDataPersistent('account');
    if (this.account == null) {
      this.router.navigate(['index']);
    } else if (this.account.role.roleName === "ADMIN"){
      this.router.navigate(['/dashboard']);
    } else if (this.account.role.roleName === "USER"){
      this.router.navigate(['/user-dashboard']);
    }
  }

  async send() {
    emailjs.init('Lz3yioYNsDIfU1nZC');
    let response = await emailjs.send("service_70ac89a", "template_vvtyqof", {
      message: this.form.value.message,
      from_email: this.form.value.from_email
    });

    if (response.status === 200) {
      // Email sent successfully
      alert('Your message has been sent successfully!');
      this.form.get('message')?.setValue('');
      this.form.get('from_email')?.setValue('');
    } else {
      // Email failed to send
      alert('An error occurred while sending your message. Please try again later.');
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
