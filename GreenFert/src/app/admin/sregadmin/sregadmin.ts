import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sregadmin',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './sregadmin.html',
  styleUrl: './sregadmin.scss',
})
export class Sregadmin {
  shopfg!: FormGroup;
  savestatus=false;

  locationarray: any[] = [];
  districtarray: any[] = [];

  selectedFiles?: FileList;
  currentfile?: File;
  fileinfos?: Observable<any>;
  message = '';

  // 🔥 IMAGE PREVIEW
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dbservice: DbService,
    private rout: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viewdata();

    this.shopfg = this.fb.group({
      shopname: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]],
      shopemail: ['',[Validators.required,Validators.email]],
      contact: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      image: ['',[Validators.required]],
      locationid: ['',[Validators.required]],
      shoplicence: ['',[Validators.required]],
      districtid: ['',[Validators.required]],
      username: ['',[Validators.required,Validators.minLength(4)]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    });
  }

  /* ===============================
     FILE SELECT + PREVIEW (MERGED)
  ================================ */
  selectFile(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file: File = files[0];

    // Validate image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    this.selectedFiles = files;
    this.currentfile = file;

    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  /* ===============================
     LOAD DISTRICTS
  ================================ */
  viewdata() {
    this.dbservice.dlocation().then((data: any) => {
      this.locationarray = data;
      this.cdr.detectChanges();
    });
  }

  onchange() {
    const id = this.shopfg.value.districtid;
    this.dbservice.ddistrict({ id }).then((data: any) => {
      this.districtarray = data;
      this.cdr.detectChanges();
    });
  }

  /* ===============================
     REGISTER SHOP
  ================================ */
  sreg() {
    if (!this.shopfg.valid) {
      this.savestatus = true;
      return;
    }
    if (!this.currentfile) {
      alert('Please upload shop image');
      return;
    }

    // Upload image
    this.dbservice.upload(this.currentfile).subscribe((event: any) => {
      if (event?.body?.message) {
        this.message = event.body.message;
      }
    });

    // Set image name
    this.shopfg.patchValue({
      image: this.currentfile.name
    });

    // Submit form
    this.dbservice.sregisteraction(this.shopfg.value).then((result: any) => {
      if (result.message === 'success') {

  Swal.fire({
    icon: 'success',
    title: 'Shop Registered',
    text: 'The shop has been successfully added and is pending approval.',
    confirmButtonText: 'View Shops',
    confirmButtonColor: '#4f46e5',
    background: '#ffffff',
    color: '#0f172a',
    iconColor: '#22c55e',
    showClass: {
      popup: 'animate__animated animate__fadeInUp animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown animate__faster'
    }
  }).then(() => {
    this.rout.navigate(['/adminmaster/sview']);
  });

} else {

  Swal.fire({
    icon: 'error',
    title: 'Registration Failed',
    text: 'Something went wrong. Please try again.',
    confirmButtonColor: '#dc2626'
  });

}

    });
  }

}
