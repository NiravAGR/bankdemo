import { Component, OnInit } from '@angular/core'
import { Account } from './balance-transfer-own'
import { BalanceTransferOwnService } from './balance-transfer-own.service'

@Component({
    selector: 'app-balance-transfer-own',
    templateUrl: './balance-transfer-own.component.html',
    styleUrls: ['./balance-transfer-own.component.css']
})
export class BalanceTransferOwnComponent {

    accounts: Account[];
    account = new Account();
    customerIdSearch: number;
    apiResponse: string;
    transferToAccount: number;
    transferFromAccount: number;
    transferAmount: number;
    infoFlag = "false";

    constructor(private balanceTransferOwnService: BalanceTransferOwnService) {
    }

    getAccountList(customerId: number): void {
        this.accounts = null;
        this.transferAmount = null;
        if (customerId == null || customerId == undefined) {
            this.apiResponse = "Enter Customer Id";
            return;
        } else if (customerId > 0) {
            this.apiResponse = null;
        } else {
            this.apiResponse = "Enter Customer Id";
            return;
        }

        this.balanceTransferOwnService.getAccountList(customerId)
            .subscribe((accountList) => {
                if (accountList == null || JSON.stringify(accountList) == "[]" || accountList.lenght == 0) {
                    this.apiResponse = "No data found";
                } else {
                    this.accounts = accountList;
                    if (this.infoFlag != "true") {
                        this.apiResponse = null;
                    } else {
                        this.infoFlag = "false";
                    }

                }
            }, (error) => {
                console.log(error);
                this.apiResponse = "Something went wrong.. try again..";
            }
            );
    }


    private reset(): void {
        this.account.accountNo = null;
        this.account.customerId = null;
        this.account.type = null;
        this.account.amount = null;
        this.apiResponse = null;
    }

    transferOwnBalance(accountNo: number): void {
        this.apiResponse = null;
        if (this.transferFromAccount == null || this.transferToAccount == null || this.transferAmount == null) {
            this.apiResponse = "Provide From Account No, To Account No and Amount";
            return;
        } else if (this.transferFromAccount == this.transferToAccount) {
            this.apiResponse = "From and To account can not be same";
            return;
        } else if (this.transferAmount <= 0) {
            this.apiResponse = "Transfer amount can not be negative";
            return;
        }

        this.balanceTransferOwnService.transferOwnBalance(this.transferFromAccount, this.transferToAccount, this.transferAmount, this.account)
            .subscribe((responseData) => {
                this.reset();
                this.infoFlag = "true";
                this.getAccountList(this.customerIdSearch);
                this.apiResponse = JSON.stringify(responseData);
                this.transferFromAccount = undefined;
                this.transferToAccount = undefined;
            },
                (error) => {
                    console.log(error);
                    this.apiResponse = "Something went wrong.. try again..";
                }
            )
    }

    getFromTransferAccount(value: number): void {
        this.transferFromAccount = value;
    }

    getToTransferAccount(value: number): void {
        this.transferToAccount = value;
    }

    getTransferAmount(value: number): void {
        this.transferAmount = value;
    }

}