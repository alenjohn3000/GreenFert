import { ChangeDetectorRef, Component } from '@angular/core';
import { DbService } from '../../db-service';
import { Route, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-locationview',
  imports: [RouterLink],
  templateUrl: './locationview.html',
  styleUrl: './locationview.scss',
})
export class Locationview {
public locationarray: any[] = [];

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewdata();
  }

  viewdata() {
    this.db.locationview().then((data: any) => {
      this.locationarray = data;
      this.cdr.detectChanges();
    });
  }

  locationdelete(did: string) {

    // 🔐 CONFIRMATION ALERT (BONUS)
    Swal.fire({
      title: 'Are you sure?',
      text: 'This location will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.isConfirmed) {

        this.db.deletelocation({ did }).then((confirmation: any) => {

          if (confirmation.message === 'Success') {

            // ✅ SUCCESS ALERT
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Location deleted successfully.',
              confirmButtonColor: '#d99e1e'
            }).then(() => {
              this.viewdata();
            });

          } else {

            // ❌ ERROR ALERT
            Swal.fire({
              icon: 'error',
              title: 'Delete Failed',
              text: 'Unable to delete location. Please try again.',
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
