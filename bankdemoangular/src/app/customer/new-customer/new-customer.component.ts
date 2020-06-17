import { Component, OnInit } from '@angular/core'
import { Customer } from './new-customer'
import { NewCustomerService } from './new-customer.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-customer',
    templateUrl: './new-customer.component.html',
    styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

    customers: Customer[];
    customer = new Customer();
    customerIdField: number;
    apiResponse: string;
    registerForm: FormGroup;
    actionTitle1 = "Add New Customer:";
    saved = false;
    mobNumberPattern = "^[0-9]{10}$";
    ssnPattern = "^[0-9]{9}$";

    constructor(private customerService: NewCustomerService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {

        this.registerForm = this.formBuilder.group({
            customerId: [null, []],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            mobileNumber: [null, [Validators.required]],
            emailID: [null, [Validators.required, Validators.email]],
            address: [null, [Validators.required]],
            city: [null, [Validators.required]],
            ssn: [null, [Validators.required]]
        });
    }

    formRegistration(): void {
        this.registerForm = this.formBuilder.group({
            customerId: [this.customer.customerId, []],
            firstName: [this.customer.firstName, [Validators.required]],
            lastName: [this.customer.lastName, [Validators.required]],
            mobileNumber: [this.customer.mobileNumber, [Validators.required]],
            emailID: [this.customer.emailID, [Validators.required, Validators.email]],
            address: [this.customer.address, [Validators.required]],
            city: [this.customer.city, [Validators.required]],
            ssn: [this.customer.ssn, [Validators.required]]
        });
    }

    get fields() {
        return this.registerForm.controls;
    }

    saveCustomerDetails(): void {
        this.saved = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.customerService.saveCustomerDetails(this.registerForm.value)
            .subscribe((response: JSON) => {
                this.apiResponse = Object.values(response)[0];
                this.reset();
            },
                (error) => {
                    console.log(error);
                    this.apiResponse = "Something went wrong.. try again..";
                }
            )
    }

    private reset(): void {
        console.log("inside reset");
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