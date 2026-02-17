import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-shome',
  imports: [RouterModule, CommonModule],
  templateUrl: './shome.html',
  styleUrl: './shome.scss',
})
export class Shome {
  public categoryarray:any[]=[];
       public parray:any[]=[];
       
    quantity: any = {};
  constructor(private db:DbService,private cdr:ChangeDetectorRef,private router:Router){}
  ngOnInit(): void {
  this.viewdata();
  }
  
  viewdata(){
    this.db.categoryview().then((data:any)=>{
    this.categoryarray=data;
    this.cdr.detectChanges();
  })
   this.db.pview().then((data:any)=>{
    this.parray=data;
    
    this.cdr.detectChanges();
  })
  }
  
   addtocart(did: string) {
    this.db.Addtocart({
      loginid: localStorage.getItem('login_id'),
      did: did,
      quantity: this.quantity
    }).then((confirmation: any) => {
      const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    iconColor: '#edad45',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  
  
      if (confirmation.message === "success") {
  
      Toast.fire({
          icon: 'success',
          title: 'Added to cart successfully'
        });
        this.viewdata();
  
      } else {
  
        Swal.fire({
          icon: 'info',
          title: 'Already in Cart',
          text: 'This product is already in your cart.',
          showCancelButton: true,
          confirmButtonText: 'View Cart',
          cancelButtonText: 'Continue Shopping',
          confirmButtonColor: '#ffb338',
          cancelButtonColor: '#ade74e'
        }).then((result) => {
          if (result.isConfirmed) {
            // redirect to cart page
            this.router.navigate(['/customermaster/cart']);
          }
        });
  
      }
    });
  }

}
