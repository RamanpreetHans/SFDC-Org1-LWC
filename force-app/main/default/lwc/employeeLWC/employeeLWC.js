import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import EMPLOYEE_OBJECT from '@salesforce/schema/Employee__c';
import NAME_FIELD from '@salesforce/schema/Employee__c.Name';
import EMAIL_FIELD from '@salesforce/schema/Employee__c.Email__c';
import DOB_FIELD from '@salesforce/schema/Employee__c.Date_of_Birth__c';
import COUNTRY_FIELD from '@salesforce/schema/Employee__c.Country__c';
import POSTALCODE_FIELD from '@salesforce/schema/Employee__c.Postal_Code__c';
import LASTNAME_FIELD from '@salesforce/schema/Employee__c.Last_Name__c';
import PHONE_FIELD from '@salesforce/schema/Employee__c.Phone__c';
import EMPLOYEECODE_FIELD from '@salesforce/schema/Employee__c.Employee_Code__c';
import STATE_FIELD from '@salesforce/schema/Employee__c.State__c';



export default class EmployeeLWC extends LightningElement {

    objectApiName = EMPLOYEE_OBJECT;
    fields = [NAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD, DOB_FIELD, COUNTRY_FIELD,
         POSTALCODE_FIELD, PHONE_FIELD, EMPLOYEECODE_FIELD, STATE_FIELD ];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Employee created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

}