import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DbService } from '../../db-service';
@Component({
  selector: 'app-guesthome',
  imports: [RouterModule, CommonModule],
  templateUrl: './guesthome.html',
  styleUrl: './guesthome.scss',
})
export class Guesthome {
  public categoryarray: any[] = [];
  public parray: any[] = [];
  quantity: any = {};
  showStickyRegister = false;

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.viewdata();
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    this.showStickyRegister = !this.isLoggedIn() && y > 700;
  }


  /* ===============================
     LOAD DATA (UNCHANGED)
  =============================== */
  viewdata() {
    this.db.categoryview().then((data: any) => {
      this.categoryarray = data;
      this.cdr.detectChanges();
    });

    this.db.pview().then((data: any) => {
      this.parray = data;
      this.cdr.detectChanges();
    });
  }

  /* ===============================
     LOGIN CHECK
  =============================== */
  isLoggedIn(): boolean {
    const id = localStorage.getItem('login_id');
    return id !== null && id !== '' && id !== 'null' && id !== 'undefined';
  }


  /* ===============================
     REGISTER GATE (FOR LINKS)
  =============================== */
  requireRegister(targetRoute?: any[]) {
    console.log('requireRegister clicked');
    console.log(localStorage.getItem('login_id'))
    if (!this.isLoggedIn() && !0) {
      Swal.fire({
        icon: 'info',
        title: 'Register to Continue',
        text: 'Please register to access GreenFert services.',
        showCancelButton: true,
        confirmButtonText: 'Register Now',
        cancelButtonText: 'Later',
        confirmButtonColor: '#16a34a',
        cancelButtonColor: '#64748b'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/register']);
        }
      });
      return;
    }

    if (targetRoute) {
      this.router.navigate(targetRoute);
    }
  }

  /* ===============================
     ADD TO CART (GUEST SAFE)
  =============================== */
  addtocart(did: string) {

    // 🔒 GUEST CHECK
    if (!this.isLoggedIn()) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please register to add items to your cart.',
        confirmButtonText: 'Register',
        confirmButtonColor: '#ffb338'
      }).then(() => {
        this.router.navigate(['/register']);
      });
      return;
    }

    // ✅ ORIGINAL LOGIC (UNCHANGED)
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
            this.router.navigate(['/customermaster/cart']);
          }
        });

      }
    });
  }

}
