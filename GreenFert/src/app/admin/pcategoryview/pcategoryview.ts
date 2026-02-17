import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pcategoryview',
  imports: [RouterModule],
  templateUrl: './pcategoryview.html',
  styleUrl: './pcategoryview.scss',
})
export class Pcategoryview {
  public categoryarray:any[]=[];
constructor(private db:DbService,private cdr:ChangeDetectorRef,private router:Router){}
ngOnInit(): void {
this.viewdata();
}

viewdata(){
  this.db.categoryview().then((data:any)=>{
  this.categoryarray=data;
  this.cdr.detectChanges();
})
}


 categorydelete(did: string) {

  // 🔥 CONFIRM BEFORE DELETE
  Swal.fire({
    title: 'Are you sure?',
    text: 'This category will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      this.db.deletecategory({ did }).then((confirmation: any) => {

        if (confirmation.message === 'Success') {

          // ✅ SUCCESS
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Category deleted successfully.',
            confirmButtonColor: '#f59e0b'
          }).then(() => {
            this.viewdata();
          });

        } else {

          // ❌ ERROR
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'Unable to delete category. Please try again.',
            confirmButtonColor: '#dc3545'
          }).then(() => {
            this.viewdata();
          });

        }

      });

    }

  });

}

}
