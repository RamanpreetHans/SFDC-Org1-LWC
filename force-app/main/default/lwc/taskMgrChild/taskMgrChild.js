import { api, LightningElement, wire } from 'lwc';
import { createRecord, updateRecord, deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CUSTOM_TASK_OBJECT from '@salesforce/schema/CustomTask__c';
import ID_FIELD from '@salesforce/schema/CustomTask__c.Id';
import NAME_FIELD from '@salesforce/schema/CustomTask__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/CustomTask__c.Description__c';
import DATE_FIELD from '@salesforce/schema/CustomTask__c.Date__c';
import TASK_USER_FIELD from '@salesforce/schema/CustomTask__c.TaskUser__c';


export default class TaskMgrChild extends LightningElement {

    @api day;
    @api user;

    //Task Controller Fields
    taskExists = false;

    //Task Fields
    taskId;
    taskName = '';
    description = '';
    date;
    taskUser;

    //Modal Fields
    content1 = 'Enter Info for Task';
    content2 = 'Modify The Task';
    header = 'The modal header';

    

    // Handle Field Inputs 

    handleTaskName(event) {
        this.taskName = event.target.value;
    }

    handleDescription(event) {
        this.description = event.target.value;
    }

    handleDate(event) {
        this.date = event.target.value;
    }

    handleTaskUser(event) {
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


    //Task Actions

    createTask() {
        console.log('create task Executed');
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.taskName;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
        fields[DATE_FIELD.fieldApiName] = this.date;
        fields[TASK_USER_FIELD.fieldApiName] = this.taskUser;
        const recordInput = { apiName: CUSTOM_TASK_OBJECT.objectApiName, fields: fields };

        createRecord(recordInput)
            .then((task) => {
                this.taskId = task.id;

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Task created with ID: ' + this.taskId,
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

    editTask() {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.taskId;
        fields[NAME_FIELD.fieldApiName] = this.taskName;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
        fields[DATE_FIELD.fieldApiName] = this.date;
        fields[TASK_USER_FIELD.fieldApiName] = this.taskUser;

        const recordInput = { fields: fields };
        console.log('Task Id is: ' + fields[ID_FIELD.fieldApiName]);
        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Edited Successfully',
                        message: 'Task Edited Successfully',
                        variant: 'success'
                    })
                );
                this.closeModal();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent(
                        {
                            title: 'Error Editing Task',
                            message: 'Error Encountered while Editing',
                            variant: 'error'
                        })
                );
            })
    }

    clearTaskFields()
    {
        this.taskName ='';
        this.taskUser='';
        this.date = '';
        this.description='';
        this.taskId='';
    }


    deleteTask(event) {
        deleteRecord(this.taskId)
            .then(() => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Task Deleted',
                    variant: 'success'
                }));

                this.taskExists=false;
                this.clearTaskFields();
                this.closeModal();

            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent(
                    {
                        title: 'Error Deleting Task',
                        message: error.body.message,
                        variant: 'error'
                    }
                ))
            })
    }



}