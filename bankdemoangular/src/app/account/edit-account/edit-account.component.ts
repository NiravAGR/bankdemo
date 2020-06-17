import { Component, OnInit } from '@angular/core'
import { Account } from './edit-account'
import { EditAccountService } from './edit-account.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {

    accounts: Account[];
    account = new Account();
    accountNoSearch: number;
    apiResponse: string;
    actionTitle1 = "Edit Account:";
    registerForm: FormGroup;
    customerIdSearch: number;
    saved = false;
    amountPattern = "^[0-9]{12}$";


    constructor(private accountService: EditAccountService,
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
            accountNo: [this.account.accountNo, []],
            customerId: [this.account.customerId, []],
            type: [this.account.type, [Validators.required]],
            amount: [this.account.amount, [Validators.required]]
        });
    }

    get fields() {
        return this.registerForm.controls;
    }


    getAccount(accountNo: number): void {
        if (accountNo == null) {
            this.apiResponse = "Enter account no";
            return;

        } else if (accountNo > 0) {
            this.apiResponse = null;;
        } else {
            this.apiResponse = "Enter account no";
            return;
        }
        this.reset();
        this.accountService.getAccount(accountNo)
            .subscribe((accountDetails) => {
                if (accountDetails != null) {
                    this.account = accountDetails;
                    this.formRegistration();
                } else {
                    this.apiResponse = "No data found";
                }
            }, (error) => {
                this.reset();
                console.log(error);
                this.apiResponse = "Something went wrong.. try again..";
            }
            );
    }

    updateAccountDetails(): void {
        if (this.account.customerId == null || this.account.customerId == undefined) {
            this.apiResponse = "Search account and then edit";
            return;
        }
        this.accountService.updateAccountDetails(this.registerForm.value)
            .subscribe((response) => {
                this.apiResponse = JSON.stringify(response);
                this.reset();
            }, (error) => {
                console.log(error);
                this.apiResponse = "Something went wrong.. try again..";
            }
            )
    }


    private reset(): void {
        this.account.accountNo = null;
        this.account.customerId = null;
        this.account.type = null;
        this.account.amount = null;
        this.accountNoSearch = null;

    }


}