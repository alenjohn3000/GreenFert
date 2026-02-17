import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-districtview',
  imports: [RouterModule],
  templateUrl: './districtview.html',
  styleUrl: './districtview.scss',
})
export class Districtview {
public districtarray: any[] = [];

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewdata();
  }

  viewdata() {
    this.db.districtview().then((data: any) => {
      this.districtarray = data;
      this.cdr.detectChanges();
    });
  }

  districtdelete(did: string) {

    // 🔥 CONFIRMATION ALERT (BONUS)
    Swal.fire({
      title: 'Are you sure?',
      text: 'This district will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.isConfirmed) {

        this.db.deletedistrict({ did }).then((confirmation: any) => {

          if (confirmation.message === 'Success') {

            // ✅ SUCCESS ALERT
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'District deleted successfully.',
              confirmButtonColor: '#d99e1e'
            }).then(() => {
              this.viewdata();
            });

          } else {

            // ❌ ERROR ALERT
            Swal.fire({
              icon: 'error',
              title: 'Delete Failed',
              text: 'Unable to delete district. Please try again.',
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