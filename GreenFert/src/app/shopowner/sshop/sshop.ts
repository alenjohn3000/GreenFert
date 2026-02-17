import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DbService } from '../../db-service';
@Component({
  selector: 'app-sshop',
  imports: [RouterModule,CommonModule],
  templateUrl: './sshop.html',
  styleUrl: './sshop.scss',
})
export class Sshop {
     quantity: any = {};

  parray: any[] = [];
  filteredProducts: any[] = [];
  categoryarray: any[] = [];
  selectedCategory: any = 'all';

  constructor(private db: DbService, private rout:Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.db.pview().then((data: any) => {
      this.parray = data;
      this.filteredProducts = data;
      this.cdr.detectChanges();
    });
  }

  loadCategories() {
    this.db.categoryview().then((data: any) => {
      this.categoryarray = data;
      this.cdr.detectChanges();
    });
  }

  filterProducts(categoryId: any) {
    this.selectedCategory = categoryId;

    if (categoryId === 'all') {
      this.filteredProducts = this.parray;
    } else {
      this.filteredProducts = this.parray.filter(
        p => p.category_id === categoryId
      );
    }
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
            this.rout.navigate(['/customermaster/cart']);
          }
        });
  
      }
    });
  }


}
