import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './balance-transfer-own';


@Injectable()
export class BalanceTransferOwnService {

    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient) {
    }


    getAccountList(customerId: number): Observable<any> {
        return this.httpService.get(`${this.baseUrl}` + "accounts/" + `${customerId}`);
    }

    getAccount(accountNo: number): Observable<any> {
        return this.httpService.get(`${this.baseUrl}` + "account/" + `${accountNo}`);
    }

    transferOwnBalance(accountFrom: any, accountTo: any, amount: number, account: Account): Observable<any> {
        return this.httpService.put(`${this.baseUrl}` + "account/" + `${accountFrom}` + "/" + `${accountTo}` + "/" + `${amount}`, account);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }



}