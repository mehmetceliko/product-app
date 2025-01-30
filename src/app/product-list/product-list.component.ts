/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
*/

import { Component, OnInit } from '@angular/core';
import { ProductService, ProductDTO } from '../product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductDTO[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => this.products = data,
      error => console.error('Error fetching products:', error)
    );
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => this.loadProducts(),
      error => console.error('Error deleting product:', error)
    );
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  addProduct(): void {
    this.router.navigate(['/products/new']);
  }
}
