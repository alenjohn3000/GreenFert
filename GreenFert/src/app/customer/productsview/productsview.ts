import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productsview',
  imports: [CommonModule,RouterModule],
  templateUrl: './productsview.html',
  styleUrl: './productsview.scss',
})
export class Productsview {
  
   product_id:any;
product:any[]=[];
public iarray: any[] = [];
  quantity: any = {};
  totalprice: any = {};
  sum:any=0;
constructor(private router:ActivatedRoute,private rout:Router,private dbservice:DbService, private cdr:ChangeDetectorRef){
  router.paramMap.subscribe((params)=>{
    this.product_id=params.get('id');
})
}
ngOnInit(): void {
  

  this.dbservice.productbypid({ id: this.product_id }).then((data: any) => {
    this.product= data;
    this.product.forEach(item => {
        if (!this.quantity[item.product_id]) {
          this.quantity[item.product_id] = 1;
          this.totalprice[item.product_id] = item.amount;
          this.sum+=this.totalprice[item.product_id];
        }
      });
      
    this.cdr.detectChanges();
  });
}
addtocart(did: string) {
    this.dbservice.Addtocart({ loginid: localStorage.getItem('login_id'), did: did,quantity:this.quantity }).then((confirmation: any) => {
      if (confirmation.message == "success") {
        alert('Add to Cart Successfully');
        
      }
      else {
        alert('Failed to add');
        
      }
    })
  }
// INCREASE QUANTITY
increaseQty(pid: any) {
  this.dbservice.pdata({ pid }).then((data: any) => {
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

    // Max stock reached → show toast
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

    // Increase quantity
    this.quantity[pid]++;
    this.totalprice[pid] = price * this.quantity[pid];
    this.sum += price;

    this.cdr.detectChanges();
  });
}

// DECREASE QUANTITY
decreaseQty(pid: any) {
  this.dbservice.pdata({ pid }).then((data: any) => {
    this.iarray = data;

    const price = this.iarray[0].amount;

    // Minimum quantity reached → show toast
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

    // Decrease quantity
    this.quantity[pid]--;
    this.totalprice[pid] = price * this.quantity[pid];
    this.sum -= price;

    this.cdr.detectChanges();
  });
}

 
   buy(did: string) {
    this.dbservice.Buy({ loginid: localStorage.getItem('login_id'), did: did,totalprice:this.totalprice,quantity:this.quantity }).then((confirmation: any) => {
      if (confirmation.message == "success") {
        alert('Choose a delivery address');
        this.rout.navigate(['/customermaster/paddress']);
        
      }
      else {
        alert('Failed to proceed');
        
      }
    })
  }
}
