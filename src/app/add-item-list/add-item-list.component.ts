import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

import * as models from '../models';
import { ItemConfig } from '../shared/configs/item.config';

declare var $: any;

@Component({
  selector: 'app-add-item-list',
  templateUrl: './add-item-list.component.html',
  styleUrls: ['./add-item-list.component.css']
})
export class AddItemListComponent implements OnInit {

  itemForm: FormGroup;
  public subCategories: any[];
  public categories: any[];
  public failedToCreate: boolean = false;
  public isCreated: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.subCategories = ItemConfig.getSubCategories();
    this.categories = ItemConfig.getCategories();
    this.addFormControl();
  }

  addFormControl() {
    this.itemForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      subCategory: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      expDate: new FormControl('', Validators.required),
      prescription: new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required),
    });
  }

  item() {
    debugger
    const data: models.ItemModel = {};
    data.productName = this.itemForm.get('productName').value;
    data.price = this.itemForm.get('price').value;
    data.category = this.itemForm.get('category').value;
    data.description = this.itemForm.get('description').value;
    data.expDate = this.itemForm.get('expDate').value;
  }

  addProduct() {

    this.failedToCreate = false;
    this.isCreated = false;

    let itemToSave: models.ItemModel = {};
    itemToSave.productName = this.itemForm.get('productName').value;
    itemToSave.price = this.itemForm.get('price').value;
    itemToSave.category = this.itemForm.get('category').value;
    itemToSave.subCategory = this.itemForm.get('subCategory').value;
    itemToSave.description = this.itemForm.get('description').value;
    itemToSave.expDate = this.itemForm.get('expDate').value;
    itemToSave.prescription = this.itemForm.get('prescription').value;
    itemToSave.availability = this.itemForm.get('availability').value;

    this.apiService.updateItem(itemToSave).subscribe(
      result => {
        this.isCreated = true;
      },
      (err) => {
        this.failedToCreate = true;
      }

    );

  }
}
