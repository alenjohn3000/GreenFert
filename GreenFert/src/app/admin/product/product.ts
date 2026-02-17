import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
productfg!: FormGroup;
  public carray: any[] = [];
  savestatus=false;

  selectedFiles?: FileList;
  currentfile?: File;
  fileinfos?: Observable<any>;
  message = '';

  // 🔥 Image preview
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dbservice: DbService,
    private rout: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.productfg = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      amount: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      image: ['',[Validators.required]],
      categoryid: ['',[Validators.required]],
      stock: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      kg: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      description: ['',[Validators.required,Validators.minLength(10)]]
    });

    this.viewdata();
  }

  /* ==========================
     CATEGORY LOAD
  =========================== */
  viewdata() {
    this.dbservice.categoryview().then((data: any) => {
      this.carray = data;
      this.cdr.detectChanges();
    });
  }

  /* ==========================
     FILE SELECT + PREVIEW
  =========================== */
  selectFile(event: any): void {

    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file: File = files[0];

    // Validate image
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please select a valid image file.',
        confirmButtonColor: '#dc2626'
      });
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

  /* ==========================
     PRODUCT REGISTER
  =========================== */
  sproduct() {
    if (!this.productfg.valid) {
      this.savestatus = true;
      return;
    }

    if (!this.currentfile) {
      Swal.fire({
        icon: 'warning',
        title: 'Image Required',
        text: 'Please upload a product image.',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }

    // Upload image first
    this.dbservice.upload(this.currentfile).subscribe((event: any) => {
      if (event?.body?.message) {
        this.message = event.body.message;
      }
    });

    // Patch image name properly
    this.productfg.patchValue({
      image: this.currentfile.name
    });

    // Submit form
    this.dbservice.pregisteraction(this.productfg.value).then((result: any) => {

      if (result.message === 'success') {

        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          text: 'The product has been successfully registered.',
          confirmButtonText: 'View Products',
          confirmButtonColor: '#f59e0b',
          iconColor: '#22c55e'
        }).then(() => {
          this.rout.navigate(['/adminmaster/productview']);
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
