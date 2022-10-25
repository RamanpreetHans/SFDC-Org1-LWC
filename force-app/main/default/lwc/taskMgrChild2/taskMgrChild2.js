import { api, LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CUSTOM_TASK_OBJECT from '@salesforce/schema/CustomTask__c';
import NAME_FIELD from '@salesforce/schema/CustomTask__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/CustomTask__c.Description__c';
import DATE_FIELD from '@salesforce/schema/CustomTask__c.Date__c';
import TASK_USER_FIELD from '@salesforce/schema/CustomTask__c.TaskUser__c';


export default class TaskMgrChild extends LightningElement {
    @api day;
    @api objectApiName;
    fields = [NAME_FIELD, DESCRIPTION_FIELD, DATE_FIELD, TASK_USER_FIELD];

    taskExists=false;
    //Task Fields
    taskName='';
    description='';
    date;
    taskUser;
    
    //Modal Fields
    content1 = 'Enter Info for Task';
    content2 = 'Modify The Task';
    header = 'The modal header';

    handleSuccess(event)
    {
        const evt = new ShowToastEvent({
            title: "Task Created Successfully",
            message: "Task ID: " + event.detail.id,
            variant: "success"
        });

        this.dispatchEvent(evt);
    }
    

    handleTaskName(event)
    {
        this.taskName = event.target.value;
    }

    handleDescription(event)
    {
        this.description = event.target.value;
    }

    handleDate(event)
    {
        this.date = event.target.value;
    }

    handleTaskUser(event)
    {
        this.taskUser = event.target.value;
    }

    handleHeaderChange(event) {
        this.header = event.target.value;
    }

    handleContentChange(event) {
        this.content = event.target.value;
    }

    showModal() {
        const modal = this.template.querySelector('c-modal');
        modal.show();
    }

    cancelModal() {
        const modal = this.template.querySelector('c-modal');
        modal.hide();
    }

    closeModal() {
        const modal = this.template.querySelector('c-modal');
        modal.hide();
    }

    
    //My Actions

    createTask()
    {
        console.log('create task Executed');
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.taskName;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
        fields[DATE_FIELD.fieldApiName] = this.date;
        fields[TASK_USER_FIELD.fieldApiName] = this.taskUser;
        const recordInput = { apiName: CUSTOM_TASK_OBJECT.objectApiName, fields };



        createRecord(recordInput)
            .then((task) => {
        
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Task created',
                        variant: 'success'
                    })
                );

                this.taskExists = true;
                this.closeModal();
            })
            .catch((error) => {
                console.log('We got error');
                console.log(JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating Task',
                        message: 'Could Not Create Task',
                        variant: 'error'
                    })
                );
            });

    }
}