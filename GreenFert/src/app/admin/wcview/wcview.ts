import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wcview',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './wcview.html',
  styleUrl: './wcview.scss',
})
export class Wcview {
  selectedImage: string | null = null;
 public wcarray: any[] = [];

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewdata();
  }

  /* ===============================
     LOAD DATA
  ================================ */
  viewdata() {
    this.db.wcview().then((data: any) => {
      this.wcarray = data;
      this.cdr.detectChanges();
    });
  }

  /* ===============================
     DELETE CONFIRMATION
  ================================ */
  confirmDelete(id: string) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'This waste collector will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.isConfirmed) {
        this.wcdelete(id);
      }

    });

  }

  /* ===============================
     DELETE COLLECTOR
  ================================ */
 wcdelete(did: string) {

  // Step 1: Remove Assignments
  this.db.removeass({ did }).then((removeResult: any) => {

    if (removeResult.message === "success") {

      // 🔵 Show assignment removal success first
      Swal.fire({
        icon: 'info',
        title: 'Assignments Removed',
        text: 'All assigned shops were successfully removed.',
        confirmButtonColor: '#3b82f6'
      }).then(() => {

        // Step 2: Delete Collector
        this.db.deletewc({ did }).then((deleteResult: any) => {

          if (deleteResult.message === "Success") {

            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Waste collector deleted successfully.',
              confirmButtonColor: '#f59e0b'
            }).then(() => {
              this.viewdata();
            });

          } else {

            Swal.fire({
              icon: 'error',
              title: 'Delete Failed',
              text: 'Unable to delete waste collector.',
              confirmButtonColor: '#dc2626'
            });

          }

        });

      });

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Assignment Removal Failed',
        text: 'Could not remove assigned shops.',
        confirmButtonColor: '#dc2626'
      });

    }

  });

}


  
  
}
