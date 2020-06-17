import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './new-account';


@Injectable()
export class NewAccountService{

    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient){
    }


    getCustomer(customerId: number): Observable<any>{
        return this.httpService.get(`${this.baseUrl}` + "customer/" + `${customerId}`);
    }

    saveAccountDetails(account: any): Observable<Object>{
          console.log("Inside save account service.."+ account.accountNo, account.customerId,account.type,account.amount);
        return this.httpService.post(`${this.baseUrl}` + "save-account", account);
    }

    private handleError(error: Response){
        return Observable.throw(error);
    }            
    
}