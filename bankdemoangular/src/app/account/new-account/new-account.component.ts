import { Component, OnInit } from '@angular/core';
import { Account } from './new-account';
import { Customer } from './new-account-customer';
import { NewAccountService } from './new-account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-account',
    templateUrl: './new-account.component.html',
    styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

    accounts: Account[];
    account = new Account();
    customer = new Customer();
    selectedAccount = new Account();
    actionTitle1 = "New Account:";
    registerForm: FormGroup;
    apiResponse: string;
    customerIdSearch: number;
    saved = false;
    amountPattern = "[0-9]*";

    constructor(private accountService: NewAccountService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            accountNo: [null, []],
            customerId: [null, []],
            type: [null, [Validators.required]],
            amount: [null, [Validators.required]]
        });
    }

    formRegistration(): void {
        this.registerForm = this.formBuilder.group({
            customerId: [this.account.customerId, []],
            type: [this.account.type, [Validators.required]],
            amount: [this.account.amount, [Validators.required]]
        });
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
        this.accountService.getCustomer(customerId)
            .subscribe((customerDetails) => {
                if (customerDetails != null) {
                    this.customer = customerDetails;
                    this.apiResponse = null;
                    this.account.customerId = this.customer.customerId;
                    this.registerForm.setValue = customerDetails;
                    this.formRegistration();
                }
                else {
                    this.apiResponse = "No data found";
                }
            }, (error) => {
                console.log(error);
                this.apiResponse = "Something went wrong.. Try again..";
            }
            );
    }

    saveAccountDetails(): void {
        this.saved = true;
        if (this.registerForm.invalid) {
            return;
        }
        if (this.customer.firstName == null || this.customer.firstName == undefined) {
            this.apiResponse = "Search customer and then add account";
            return;
        }
        this.accountService.saveAccountDetails(this.registerForm.value)
            .subscribe((response: JSON) => {
                this.reset();
                this.formRegistration();
                this.apiResponse = JSON.stringify(response);
            },
                (error) => {
                    console.log(error);
                    this.apiResponse = "Something went wrong.. Try again..";
                }
            )
    }

    private reset(): void {
        this.account.accountNo = null;
        this.account.customerId = null;
        this.account.type = null;
        this.account.amount = null;
        this.apiResponse = null;
        this.customer.customerId = null;
        this.customer.firstName = null;
        this.customer.lastName = null;
        this.customerIdSearch = null;
        this.saved = false;
    }

}