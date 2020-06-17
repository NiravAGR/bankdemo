import { Component, OnInit } from '@angular/core'
import { Customer } from './delete-customer'
import { DeleteCustomerService } from './delete-customer.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-delete-customer',
    templateUrl: './delete-customer.component.html',
    styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

    customers: Customer[];
    customer = new Customer();
    customerIdField: number;
    customerIdSearch: number;
    apiResponse: string;
    registerForm: FormGroup;
    actionTitle1 = "Delete Customer:";
    saved = false;
    mobNumberPattern = "^[0-9]{10}$";
    ssnPattern = "^[0-9]{9}$";

    constructor(private customerService: DeleteCustomerService,
        private formBuilder: FormBuilder) {
    }
    ngOnInit(): void {
        this.reset();
    }


    get fields() {
        return this.registerForm.controls;
    }

    getCustomer(customerId: number): void {
        if (customerId == null) {
            this.apiResponse = "Enter customer id";
            return;

        } else if (customerId > 0) {
            this.apiResponse = null;;
        } else {
            this.apiResponse = "Enter customer id";
            return;
        }
        this.reset();
        window.scroll(0, 0);
        this.customerService.getCustomer(customerId)
            .subscribe((customerDetails) => {

                if (customerDetails != null) {
                    this.customer = customerDetails,
                        this.apiResponse = null;
                } else {
                    this.apiResponse = "No data found"
                }

            }, (error) => {
                console.log(error);
            }
            );
    }

    deleteCustomer(customerId: number) {
        window.scroll(0, 0);
        this.customerService.deleteCustomer(customerId)
            .subscribe((response: JSON) => {
                this.apiResponse = Object.values(response)[0];
                this.reset();
            },
                (error) => { console.log(error) }
            )
    }

    private reset(): void {
        this.customer.customerId = null;
        this.customer.firstName = null;
        this.customer.lastName = null;
        this.customer.mobileNumber = null;
        this.customer.emailID = null;
        this.customer.address = null;
        this.customer.city = null;
        this.customer.ssn = null;
        this.saved = false;
    }
}