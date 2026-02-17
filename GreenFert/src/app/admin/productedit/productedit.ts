import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productedit',
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './productedit.html',
  styleUrl: './productedit.scss',
})
export class Productedit {
  product_id: any;
  productfg!: FormGroup;
  savestatus=false;

  productarray: any[] = [];
  carray: any[] = [];

  selectedFiles?: FileList;
  currentFile?: File;
  previewUrl: string | ArrayBuffer | null = null;
  message = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private rout: Router,
    private dbservice: DbService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.product_id = params.get('id');
    });
  }

  ngOnInit(): void {

    // 🔥 FORM INIT
    this.productfg = this.fb.group({
      productid: this.product_id,
      product: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      image: [''],
      amount: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      categoryid: ['',[Validators.required]],   // FIXED
      stock: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      kg: ['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      description: ['',[Validators.required,Validators.minLength(10)]]
    });

    this.loadCategories();
    this.loadProductDetails();
  }

  /* ===============================
     LOAD CATEGORY LIST
  ================================ */
  loadCategories() {
    this.dbservice.categoryview().then((data: any) => {
      this.carray = data;
      this.cdr.detectChanges();
    });
  }

  /* ===============================
     LOAD PRODUCT DETAILS
  ================================ */
  loadProductDetails() {
    const id = this.product_id;

    this.dbservice.getProductdetailsbyid({ id }).then((data: any) => {

      this.productarray = data;

      this.productfg.patchValue({
        productid: data[0].product_id,
        product: data[0].product,
        amount: data[0].amount,
        categoryid: data[0].category_id,  // FIXED
        stock: data[0].stock,
        kg: data[0].productkg,
        description: data[0].description,
        image: data[0].productimage
      });

      // 🔥 IMAGE PREVIEW FIX
      this.previewUrl = 'http://localhost:3000/images/' + data[0].productimage;

      this.cdr.detectChanges();
    });
  }

  /* ===============================
     SELECT FILE + PREVIEW
  ================================ */
  selectFile(event: any): void {

    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file: File = files[0];

    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid File',
        text: 'Please select a valid image file.',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }

    this.selectedFiles = files;
    this.currentFile = file;

    // 🔥 PREVIEW
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);

    // Upload
    this.dbservice.upload(this.currentFile).subscribe((event: any) => {
      if (event?.body?.message) {
        this.message = event.body.message;
      }
    });

    // Patch form properly
    this.productfg.patchValue({
      image: this.currentFile.name
    });
  }

  /* ===============================
     UPDATE PRODUCT
  ================================ */
  sproduct() {
    if (!this.productfg.valid) {
      this.savestatus = true;
      return;
    }

    this.dbservice.updatep(this.productfg.value).then((result: any) => {

      if (result.message === "Success") {

        Swal.fire({
          icon: 'success',
          title: 'Product Updated',
          text: 'Product details updated successfully.',
          confirmButtonColor: '#f59e0b'
        }).then(() => {
          this.rout.navigate(['/adminmaster/productview']);
        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Error updating product. Please try again.',
          confirmButtonColor: '#dc2626'
        });

      }

    });
  }
}
