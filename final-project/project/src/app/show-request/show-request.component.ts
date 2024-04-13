import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Request } from '../model/request';
import { RequestService } from '../service/request.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.css']
})
export class ShowRequestComponent implements OnInit {
  request: Request = new Request(); 
  showReq: FormGroup;
  
  constructor(private requestService: RequestService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.showReq = this.fb.group({
      reqId: '',
      dogId: '',
      reqName: '',
      reqContact: '',
      reqMessage: '',
      reqStatus: '',
      userId: ''
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.requestService.getRequest(id).subscribe(data => {
          this.request = data; 
          this.initializeForm();
        });
      }
    });
    
  }

  initializeForm(): void {
    // this.showReq = this.fb.group({
    //   reqId: this.request.reqId,
    //   dogId: this.request.dogId,
    //   reqName: this.request.reqName,
    //   reqContact: this.request.reqContact,
    //   reqMessage: this.request.reqMessage,
    //   reqStatus: this.request.reqStatus,
    //   userId: this.request.userId
    // });
  }


  goBack(): void {
    this.router.navigate(['/requests']);
  }

  update() {
    // if (this.showReq.valid) {
    //   const updatedRequest = this.showReq.value;
    //   this.requestService.updateRequest(this.request.reqId, updatedRequest)
    //     .subscribe(
    //       response => {
    //         console.log('Request updated:', response);
    //         //this.request = Object.assign(this.request, updatedRequest);
    //         this.goBack();
    //       },
    //       error => {
    //         console.error('Error resolving request', error);
    //       }
    //     );
    // }
  }
}
