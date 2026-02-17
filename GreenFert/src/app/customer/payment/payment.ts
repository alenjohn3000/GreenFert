import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DbService } from '../../db-service';
@Component({
  selector: 'app-payment',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {
  total: any = 0;
  addressid: any;
  public paymentarray: any[] = [];
  paymentForm!:FormGroup;
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
  }
  placepayment() {
    this.db.finalpayment({loginid: localStorage.getItem('login_id'),
      total: this.total, addressid: this.addressid}).then((confirmation: any) => {
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
          this.router.navigate(['customermaster/customerhome']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#f44336'
        }).then(() => {
          this.router.navigate(['customermaster/payment', this.addressid]);
        });
      }
    });
  }



}
