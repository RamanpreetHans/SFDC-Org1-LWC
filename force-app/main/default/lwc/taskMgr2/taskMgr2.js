import { LightningElement, wire } from 'lwc';
import getUsers from '@salesforce/apex/UserController.getUsers';

export default class TaskMgr extends LightningElement {

    test='';
    users;
    userCount;

    @wire(getUsers)
    getUsersFunc({data, error})
{
    if(data){

        this.users = data;
    
        this.userCount = data.length;

        console.log(this.userCount, data);
    
    }
    
}
    
handleTest(event)
{
    this.test=event.target.value;
}
    
    
    headerRow="";
    days;
    daysArray=[];

  constructor()
  {
      super();
      console.log(this.l);
      const date = new Date();
      this.days = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();

      var x="";
      for(let i=1;i<=this.days;i++)
      {
      this.daysArray.push(i);

      }


      //  Doing for users length
      
      
      
    

  }

   
    
}