import {Component, OnInit} from '@angular/core'
import { Account} from './delete-account'
import { DeleteAccountService } from './delete-account.service'

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit{

    accounts: Account[];
    account = new Account();
    accountNoSearch: number;
    apiResponse: string;
    actionTitle1 = "Edit Account:";

    constructor(private accountService: DeleteAccountService){        
    }
    ngOnInit(): void {
        this.reset();
    }

    getAccount(accountNo: number): void{
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
                    if(accountDetails == null){
                        this.apiResponse = "No data found";
                    }else{
                        this.account = accountDetails;
                    }
            }, (error) => {
                    console.log(error);
                    this.apiResponse = "Something went wrong.. try again..";
                }
            );   
    }

    deleteAccount(accountNo: number){
        this.accountService.deleteAccount(accountNo)
            .subscribe((response) => {

                this.apiResponse = JSON.stringify(response);
                this.reset();
            },
                (error) => {
                    console.log(error)
                    this.apiResponse = "Something went wrong.. Try again..";
                }
            )
    }

    private reset(): void{
        this.account.accountNo = null;
	    this.account.customerId = null;
	    this.account.type = null;
        this.account.amount = null;	 
        this.apiResponse = null;       
    }


}