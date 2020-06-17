import {Component, OnInit} from '@angular/core'
import {Account} from './account'
import { AccountService } from './account.service'

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {

    accounts: Account[];
    account = new Account();
    selectedAccount = new Account();
    customerIdSearch: number;
    transferToAccount: number;
    transferToAmount: number;

    constructor(private accountService: AccountService){        
    }

    getAccountList(customerId: number): void{
        this.accountService.getAccountList(customerId)
            .subscribe((accountList) => {
                    this.accounts = accountList, 
                    console.log(accountList);
            }, (error) => {
                    console.log(error);
                }
            );
    }

    getAccount(accountNo: number): void{
        this.accountService.getAccount(accountNo)
            .subscribe((accountDetails) => {
                    this.account = accountDetails, 
                    console.log(accountDetails);
            }, (error) => {
                    console.log(error);
                }
            );   
    }

    saveAccountDetails(): void{
        this.accountService.saveAccountDetails(this.account)
            .subscribe((response) => {                
                this.reset();
                //this.getAccountList(accountNo);
            },
                        (error) => {
                            console.log(error);
                        }
            )
    }

    updateAccountDetails(): void{
        this.accountService.saveAccountDetails(this.account)
            .subscribe((response) => {
                console.log(response);
            },
                        (error) => {
                            console.log(error);
                        }
            )
    }

    deleteAccount(accountNo: number){
        this.accountService.deleteAccount(accountNo)
            .subscribe((response) => {
                console.log(response);
            },
                        (error) => {console.log(error)}
            )
    }

    private reset(): void{
        this.account.accountNo = null;
	    this.account.customerId = null;
	    this.account.type = null;
	    this.account.amount = null;	        
    }

    transferOwnBalance(accountNo: number): void{
        this.accountService.transferOwnBalance(accountNo, this.transferToAccount, this.transferToAmount, this.account)
            .subscribe((response) => {
                console.log(response);
            },
                        (error) => {
                            console.log(error);
                        }
            )
    }

    getTransferAccount(value: number): void{
        //this.accountTo = document.getElementById('own-accounts').nodeValue;
        this.transferToAccount = value;
    }
    getTransferAmount(value: number): void{
        //this.accountTo = document.getElementById('own-accounts').nodeValue;
        this.transferToAmount = value;
    }

}