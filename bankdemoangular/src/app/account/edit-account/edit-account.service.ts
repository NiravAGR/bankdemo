import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './edit-account';


@Injectable()
export class EditAccountService {

    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient) {
    }

    getAccount(accountNo: number): Observable<any> {
        return this.httpService.get(`${this.baseUrl}` + "account/" + `${accountNo}`);
    }

    updateAccountDetails(account: Account): Observable<Object> {
        return this.httpService.put(`${this.baseUrl}` + "account/" + `${account.accountNo}`, account);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}