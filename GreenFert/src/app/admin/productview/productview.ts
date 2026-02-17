import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productview',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './productview.html',
  styleUrl: './productview.scss',
})
export class Productview {
    selectedImage: string | null = null;

  public parray:any[]=[];
constructor(private db:DbService,private cdr:ChangeDetectorRef,private router:Router){}
ngOnInit(): void {
this.viewdata();
}

viewdata(){
  this.db.pview().then((data:any)=>{
  this.parray=data;
  this.cdr.detectChanges();
})
}

confirmDelete(productId: string) {

  Swal.fire({
    title: 'Delete Product?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f59e0b',  // your orange theme
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {

    if (result.isConfirmed) {
      this.pdelete(productId);
    }

  });

}


 pdelete(did: string) {

  this.db.deletep({ did }).then((confirmation: any) => {

    if (confirmation.message === "Success") {

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Product deleted successfully.',
        confirmButtonColor: '#f59e0b'
      }).then(() => {
        this.viewdata();
      });

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: 'Something went wrong while deleting.',
        confirmButtonColor: '#dc2626'
      });

    }

  });

}


  showOutOfStockOnly = false;

filteredProducts() {
  if (this.showOutOfStockOnly) {
    return this.parray.filter((p: any) => p.stock === 0);
  }
  return this.parray;
}


}
