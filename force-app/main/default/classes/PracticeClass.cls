public class PracticeClass {
    
    public void demoMethod()
    {
        List<Account> accList = [	SELECT Id,NamE FROM ACCOUNT LIMIT 3];
        SYSTem.debug('Acccounts : '+acclISt);
    }
}