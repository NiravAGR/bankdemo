import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';


@Injectable()
export class AccountService{

    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient){
    }


    getAccountList(customerId: number): Observable<any>{
        return this.httpService.get(`${this.baseUrl}` + "accounts/" + `${customerId}`);      
    }

    getAccount(accountNo: number): Observable<any>{
        return this.httpService.get(`${this.baseUrl}` + "account/" + `${accountNo}`);
    }

    saveAccountDetails(account: Account): Observable<Object>{
          console.log("Inside save.."+ account.accountNo);
        if(account.accountNo) {
            return this.httpService.put(`${this.baseUrl}` + "account/" + `${account.accountNo}`, account);
        }
        return this.httpService.post(`${this.baseUrl}` + "save-account", account);
    }

    updateAccountDetails(accountNo: number, account: Account): Observable<any>{
        console.log("Inside Update..");
        return this.httpService.put(`${this.baseUrl}` + "account/" + `${accountNo}`, account);
    }


    deleteAccount(accountNo: number): Observable<any>{
        return this.httpService.delete(`${this.baseUrl}` + "account/" + `${accountNo}`);
    }

    transferOwnBalance(accountFrom: number, accountTo: number, amount: number, account: Account): Observable<any>{
        console.log("Inside Balance Transfer..");
        console.log(`${this.baseUrl}` + "account/" + `${accountFrom}` + "/" + `${accountTo}` + "/" + `${amount}`);
        return this.httpService.put(`${this.baseUrl}` + "account/" + `${accountFrom}` + "/" + `${accountTo}` + "/" + `${amount}`, account);
    }

    private handleError(error: Response){
        return Observable.throw(error);
    }           
       
    
    
}