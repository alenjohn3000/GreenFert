import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-wcassign',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './wcassign.html',
  styleUrl: './wcassign.scss',
})
export class Wcassign {
 selectedImage: string | null = null;
  showAssigned = false;

  public sarray: any[] = [];
  public warray: any[] = [];
  wc_id: any;

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    rout: ActivatedRoute
  ) {
    rout.paramMap.subscribe((params: ParamMap) => {
      this.wc_id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.viewdata();
  }

  /* ===============================
     TOGGLE ASSIGNED PANEL
  =============================== */
  toggleAssigned() {
    this.showAssigned = !this.showAssigned;
  }

  /* ===============================
     LOAD DATA
  =============================== */
  viewdata() {
    this.db.sview().then((data: any) => {
      this.sarray = data;
      this.cdr.detectChanges();
    });

    const id = this.wc_id;
    this.db.wcsview({ id }).then((data: any) => {
      this.warray = data;
      this.cdr.detectChanges();
    });
  }

  /* ===============================
     SWEETALERT TOAST (BONUS)
  =============================== */
  private toast(icon: any, title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }

  /* ===============================
     ASSIGN SHOP
  =============================== */
  assignwc(did: any, oid: any) {

    const id = this.wc_id;

    this.db.assigning({ id, oid }).then((confirmation: any) => {

      if (confirmation.message === "success") {

        this.toast('success', 'Shop Assigned Successfully');
        this.viewdata();

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Assignment Failed',
          text: 'Unable to assign shop. Please try again.',
          confirmButtonColor: '#f4a000'
        });

      }

    });

  }

  /* ===============================
     REMOVE ASSIGN (WITH CONFIRM)
  =============================== */
  removeassign(did: string, oid: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the assignment.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f4a000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it'
    }).then((result) => {

      if (result.isConfirmed) {

        this.db.removeass({ did, oid }).then((confirmation: any) => {

          if (confirmation.message === "success") {

            this.toast('success', 'Assignment Removed Successfully');
            this.viewdata();

          } else {

            Swal.fire({
              icon: 'error',
              title: 'Remove Failed',
              text: 'Unable to remove assignment.',
              confirmButtonColor: '#f4a000'
            });

          }

        });

      }

    });

  }

  /* ===============================
     GET ASSIGNED SHOPS
  =============================== */
  get assignedShops() {
    return this.sarray?.filter(
      (shop: any) => shop.wastecollector_id == this.wc_id
    ) || [];
  }

}
