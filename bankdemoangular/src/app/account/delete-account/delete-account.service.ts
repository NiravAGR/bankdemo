import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './delete-account';


@Injectable()
export class DeleteAccountService {

    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient) {
    }

    getAccount(accountNo: number): Observable<any> {
        return this.httpService.get(`${this.baseUrl}` + "account/" + `${accountNo}`);
    }


    deleteAccount(accountNo: number): Observable<any> {
        return this.httpService.delete(`${this.baseUrl}` + "account/" + `${accountNo}`);
    }


    private handleError(error: Response) {
        return Observable.throw(error);
    }



}