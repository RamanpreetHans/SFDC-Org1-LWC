import { LightningElement, wire } from 'lwc';
import getUsers from '@salesforce/apex/UserController.getUsers';

export default class TaskManager extends LightningElement {

    users;
    userCount;
    account;
  

    @wire(getUsers)
    getUsersFunc({ data, error }) {
        if (data) {

            this.users = data;

            this.userCount = data.length;

            console.log('No. of Users: ' + this.userCount + ', Users are: ' + data);

        }

    }


    headerRow = "";
    days;
    daysArray = [];

    constructor() {
        super();
        const date = new Date();
        this.days = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        for (let i = 1; i <= this.days; i++) {
            this.daysArray.push(i);

        }

      

    }



}