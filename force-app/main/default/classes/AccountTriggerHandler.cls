public class AccountTriggerHandler {

   /* public static void updateNameWithPhoneBefore(List<Account> accList, Map<Id,Account> oldAccountsMap)
    {
        List<Account> updatedAccList = new List<Account>();
        for(Account acc : accList)
        {
            if(oldAccountsMap!=Null && acc.Phone != oldAccountsMap.get(acc.Id).Phone)
            {
				
                
            }
        }
    
    }
    */
    public static void updateNameWithPhoneAfter(List<Account> accList, Map<Id,Account> oldAccountsMap)
    {
        List<Account> updatedAccList = new List<Account>();
        for(Account acc : accList)
        {
            if(oldAccountsMap!=Null && acc.Phone != oldAccountsMap.get(acc.Id).Phone)
            {
				Account accObj = new Account();
                accObj.Name = acc.Name + '-'+ acc.Phone;
                accObj.Id = acc.Id;
                
                updatedAccList.add(accObj);
                
            }
            
        }
        
        if(!updatedAccList.isEmpty())
        {
            update updatedAccList;
        }
        
    }
    
    
}