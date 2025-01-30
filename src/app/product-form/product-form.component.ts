import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, ProductDTO } from '../product.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [FormsModule]
})
export class ProductFormComponent implements OnInit {
  product: ProductDTO = { name: '', price: 0, type: 0 };
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(+id).subscribe(
        product => this.product = product,
        error => console.error('Error fetching product:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id!, this.product).subscribe(
        () => this.router.navigate(['/products']),
        error => console.error('Error updating product:', error)
      );
    } else {
      this.productService.createProduct(this.product).subscribe(
        () => this.router.navigate(['/products']),
        error => console.error('Error creating product:', error)
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
