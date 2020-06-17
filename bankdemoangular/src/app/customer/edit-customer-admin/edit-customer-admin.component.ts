import { Component, OnInit } from '@angular/core'
import { Customer } from './edit-customer-admin'
import { EditCustomerAdminService } from './edit-customer-admin.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-customer-admin',
    templateUrl: './edit-customer-admin.component.html',
    styleUrls: ['./edit-customer-admin.component.css']
})
export class EditCustomerAdminComponent implements OnInit{

    customers: Customer[];
    customer = new Customer();
    customerIdField: number;
    customerIdSearch: number;
    apiResponse: string;
    registerForm: FormGroup;
    actionTitle1 = "Edit Customer Details(Admin):";
    saved = false;
    mobNumberPattern = "^[0-9]{10}$";
    ssnPattern = "^[0-9]{9}$";

    constructor(private customerService: EditCustomerAdminService, 
        private formBuilder: FormBuilder){        
    }

    ngOnInit(): void{
        this.registerForm = this.formBuilder.group({
            customerId: [null, []],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            mobileNumber: [null, [Validators.required]],
            emailID: [null, [Validators.required, Validators.email]],
            address: [null, [Validators.required]],
            city: [null, [Validators.required]],
            ssn: [null, [Validators.required]]
        });
    }

    formRegistration(): void{
        this.registerForm = this.formBuilder.group({
            customerId: [this.customer.customerId, []],
            firstName: [this.customer.firstName, [Validators.required]],
            lastName: [this.customer.lastName, [Validators.required]],
            mobileNumber: [this.customer.mobileNumber, [Validators.required]],
            emailID: [this.customer.emailID, [Validators.required, Validators.email]],
            address: [this.customer.address, [Validators.required]],
            city: [this.customer.city, [Validators.required]],
            ssn: [this.customer.ssn, [Validators.required]]
        });
    }

    get fields() { 
        return this.registerForm.controls; 
    }

    getCustomer(customerId: number): void{
        this.reset();
        if(customerId == null){
            this.apiResponse = "Enter customer id";
            return;

        }else if(customerId > 0){
            this.apiResponse = null;;
        }else{
            this.apiResponse = "Enter customer id";
            return;
        }
        this.reset();
        window.scroll(0,0);
        this.customerService.getCustomer(customerId)
            .subscribe((customerDetails) => {
                    if(customerDetails == null){
                        this.apiResponse = "No data found";
                    }else{
                    this.customer = customerDetails, 
                    this.registerForm.setValue = customerDetails;
                    this.formRegistration();}
            }, (error) => {
                    console.log(error);
                    this.apiResponse = "Something went wrong.. try again..";
                }
            );   
    }

    saveCustomerDetails(): void{
        this.saved = true;
        if (this.registerForm.invalid) {
            return;
        }
        if (this.registerForm.value == undefined) {
            this.apiResponse = "Search Customer Id to update data";
            return;
        }
        this.customerService.saveCustomerDetails(this.registerForm.value)
            .subscribe((response: JSON) => {
                this.apiResponse = Object.values(response)[0];
                this.reset();

            },
                        (error) => {
                            console.log(error);
                            this.apiResponse = "Something went wrong.. try again..";
                        }
            )
    }

    private reset(): void{
        this.customer.customerId = null;
	    this.customer.firstName = null;
	    this.customer.lastName = null;
	    this.customer.mobileNumber = null;
	    this.customer.emailID = null;
	    this.customer.address = null;
	    this.customer.city = null;
        this.customer.ssn = null;
        this.saved = false;
        this.formRegistration();
    }
}