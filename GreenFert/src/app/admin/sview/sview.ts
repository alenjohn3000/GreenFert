import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sview',
  imports: [RouterModule,CommonModule],
  templateUrl: './sview.html',
  styleUrl: './sview.scss',
})
export class Sview {
  selectedImage: string | null = null;

  public sarray:any[]=[];
constructor(private db:DbService,private cdr:ChangeDetectorRef,private router:Router){}
ngOnInit(): void {
this.viewdata();
}

viewdata(){
  this.db.sview().then((data:any)=>{
  this.sarray=data;
  this.cdr.detectChanges();
})
}


// ==========================
// REJECT SHOP
// ==========================

confirmDelete(productId: string) {

  Swal.fire({
    title: 'Reject Shop?',
    text: 'This shop will be permanently rejected.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Reject',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {

    if (result.isConfirmed) {
      this.sdelete(productId);
    }

  });

}

sdelete(did: string) {

  this.db.deletes({ did }).then((confirmation: any) => {

    if (confirmation.message === "Success") {

      Swal.fire({
        icon: 'success',
        title: 'Rejected!',
        text: 'Shop has been rejected successfully.',
        confirmButtonColor: '#f59e0b'
      }).then(() => {
        this.viewdata();
      });

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Unable to reject the shop.',
        confirmButtonColor: '#dc2626'
      });

    }

  });

}


// ==========================
// ACCEPT SHOP
// ==========================

confirmAccept(productId: string) {

  Swal.fire({
    title: 'Accept Shop?',
    text: 'This shop will be approved and activated.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#f59e0b',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Accept',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {

    if (result.isConfirmed) {
      this.saccept(productId);
    }

  });

}

saccept(did: string) {

  this.db.accepts({ did }).then((confirmation: any) => {

    if (confirmation.message === "Success") {

      Swal.fire({
        icon: 'success',
        title: 'Accepted!',
        text: 'Shop approved successfully.',
        confirmButtonColor: '#f59e0b'
      }).then(() => {
        this.viewdata();
      });

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Unable to accept the shop.',
        confirmButtonColor: '#dc2626'
      });

    }

  });

}

}
