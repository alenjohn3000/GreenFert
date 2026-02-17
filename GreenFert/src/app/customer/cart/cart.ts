import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  imports: [RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  public parray: any[] = [];
  public iarray: any[] = [];
  quantity: any = {};
  totalprice: any = {};
  sum:any=0;

  constructor(private db: DbService, private cdr: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    this.viewdata();
  }

  viewdata() {
    this.db.cpview({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.parray = data;
      this.parray.forEach(item => {
        if (!this.quantity[item.product_id]) {
          this.quantity[item.product_id] = this.parray[0].quantity;
          this.totalprice[item.product_id] = item.amount*this.quantity[item.product_id];
          this.sum+=this.totalprice[item.product_id];
        }
      });
      this.cdr.detectChanges();
    })
  }

 

  // INCREASE QUANTITY
  increaseQty(pid: any) {
  this.db.pdata({ pid }).then((data: any) => {
    this.iarray = data;

    const stock = this.iarray[0].stock;
    const price = this.iarray[0].amount;

    // Initialize quantity
    if (!this.quantity[pid] || this.quantity[pid] < 1) {
      this.quantity[pid] = 1;
      this.totalprice[pid] = price;
      this.cdr.detectChanges();
      return;
    }

    // Max stock reached
    if (this.quantity[pid] >= stock) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: `Only ${stock} available in stock`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });
      return;
    }

    // Increase
    this.quantity[pid]++;
    this.totalprice[pid] = price * this.quantity[pid];
    this.sum += price;

    console.log(this.totalprice);
    this.cdr.detectChanges();
  });
}


  // DECREASE QUANTITY
decreaseQty(pid: any) {
  this.db.pdata({ pid }).then((data: any) => {
    this.iarray = data;

    const price = this.iarray[0].amount;

    // Min quantity reached
    if (!this.quantity[pid] || this.quantity[pid] <= 1) {
      this.quantity[pid] = 1;

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'Minimum quantity is 1',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true
      });

      this.totalprice[pid] = price;
      this.cdr.detectChanges();
      return;
    }

    // Decrease
    this.quantity[pid]--;
    this.totalprice[pid] = price * this.quantity[pid];
    this.sum -= price;

    this.cdr.detectChanges();
  });
}

  deletep(did: string) {
    this.db.deletecp({ loginid: localStorage.getItem('login_id'), did: did }).then((confirmation: any) => {
      if (confirmation.message === "success") {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Item removed from cart',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });

  this.viewdata();

} else {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'error',
    title: 'Unable to remove item',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });

  this.viewdata();
}
    })
  }
  gotolocation() {
    this.db.updatepdetails({ loginid: localStorage.getItem('login_id'),totalprice:this.totalprice,quantity:this.quantity }).then((confirmation: any) => {
      if (confirmation.message === "success") {

  Swal.fire({
    icon: 'success',
    title: 'Almost there!',
    html: `
      <p style="margin:0;font-size:15px;color:#555">
        Please choose a delivery location to continue.
      </p>
    `,
    confirmButtonText: 'Choose Location',
    confirmButtonColor: '#2e7d32',
    showCancelButton: true,
    cancelButtonText: 'Later',
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
      this.router.navigate(['/customermaster/paddress']);
    }
  });

} else {

  Swal.fire({
    icon: 'error',
    title: 'Something went wrong',
    text: 'Please try again in a moment.',
    confirmButtonColor: '#d32f2f'
  });

  this.viewdata();
}
    })
  }

}
