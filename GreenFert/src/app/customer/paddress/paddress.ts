import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-paddress',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './paddress.html',
  styleUrl: './paddress.scss',
})
export class Paddress {
  locationfg!: FormGroup;
  addressList: any[] = [];
  addressarray: any[] = [];
  addresschoose!: FormGroup;
  constructor(private fb: FormBuilder, private dbservice: DbService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.locationfg = this.fb.group({
      name: [''],
      email: [''],
      number: [''],
      address: [''],
      landmark: [''],
      pincode: [''],
      loginid: [localStorage.getItem('login_id')],
    });
    this.dbservice.addressview({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.addressarray = data;
      this.cdr.detectChanges();
    })
    this.addresschoose = this.fb.group({
      address: ['']
    });
  }
  pay() {
    this.dbservice.plocationadd(this.locationfg.value).then((data: any) => {
      let addressid = data.addressid;
     if (data) {

  Swal.fire({
    icon: 'success',
    title: 'Address Confirmed',
    html: `
      <p style="margin:0;font-size:15px;color:#555">
        Please choose a payment method to complete your order.
      </p>
    `,
    confirmButtonText: 'Choose Payment',
    confirmButtonColor: '#2e7d32',
    showCancelButton: true,
    cancelButtonText: 'Back',
    cancelButtonColor: '#e0e0e0',
    reverseButtons: true,
    backdrop: `
      rgba(0,0,0,0.4)
    `,
    customClass: {
      popup: 'checkout-alert-popup',
      confirmButton: 'checkout-alert-confirm',
      cancelButton: 'checkout-alert-cancel'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/customermaster/payment', addressid]);
    }
  });

} else {

  Swal.fire({
    icon: 'error',
    title: 'Unable to Continue',
    text: 'Something went wrong while selecting the address.',
    confirmButtonColor: '#d32f2f'
  });

  this.cdr.detectChanges();
}
    })

  }
  chooseaddress() {
    this.router.navigate(['/customermaster/payment', this.addresschoose.value.address]);
  }
}
