import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-categoryproduct',
  imports: [RouterLink, CommonModule],
  templateUrl: './categoryproduct.html',
  styleUrl: './categoryproduct.scss',
})
export class Categoryproduct {
  quantity: any = {};

  product_id: any;
  parray: any[] = [];
  constructor(private router: ActivatedRoute, private rout: Router, private dbservice: DbService, private cdr: ChangeDetectorRef) {
    router.paramMap.subscribe((params) => {
      this.product_id = params.get('id');
    })
  }
  ngOnInit(): void {


    this.dbservice.productbycategory({ id: this.product_id }).then((data: any) => {
      this.parray = data;


      this.cdr.detectChanges();
    });
  }
  addtocart(did: string) {
    this.dbservice.Addtocart({
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
            this.rout.navigate(['/smaster/scart']);
          }
        });

      }
    });
  }
}