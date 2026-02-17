import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-spayment',
  imports: [ReactiveFormsModule],
  templateUrl: './spayment.html',
  styleUrl: './spayment.scss',
})
export class Spayment {
  total: any = 0;
  addressid: any;
  public paymentarray: any[] = [];
  paymentForm!: FormGroup;
  count: any;
  constructor(private fb: FormBuilder, private db: DbService, private cdr:
    ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.addressid = params.get('addressid');
    })
  }
  ngOnInit(): void {
    this.viewdata();
  }


  viewdata() {
    this.db.cpviewt({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.paymentarray = data;
      for (let data of this.paymentarray) {
        this.total += data.amount;
      }
      this.total += 20;
      console.log(this.paymentarray);
      console.log(this.total);
      this.cdr.detectChanges();
    });
    this.db.getownerdiscount({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.count = data;
      if (this.count.length >= 7) {
        this.total = this.total - (this.total * 0.2);
        console.log(this.total);
        this.cdr.detectChanges();
      }
      else
      {
        this.total = this.total;
        console.log(this.total);
        this.cdr.detectChanges();
      }
    });
  }
  placepayment() {
    this.db.finalpayment({
      loginid: localStorage.getItem('login_id'),
      total: this.total, addressid: this.addressid
    }).then((confirmation: any) => {
      console.log(confirmation);
      if (confirmation.message == 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Your payment has been completed successfully ',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4CAF50',
          background: '#f9f9f9'
        }).then(() => {
          this.router.navigate(['smaster/shome']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#f44336'
        }).then(() => {
          this.router.navigate(['smaster/spayment', this.addressid]);
        });
      }
    });
  }
}

