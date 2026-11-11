import {test , expect } from '@playwright/test';
test ('table learning' , async ({page}) => {
    await page.goto ('https://demo-bank.vercel.app/');
    await page.locator('[data-testid="login-input"]').fill('12345678');
    await page.locator('[data-testid="password-input"]').fill('asdfghjk');
    await page.locator('[data-testid="login-button"]').click()
    //checking for the number of tables in the page
    const transactions = page.getByRole('table');
    console.log('Number of tables:' ,await transactions.count());
    //Accessing a particular row in the table
    const paymentrows = page.locator('tr').filter({
        hasText : 'PayU S.A.'
    });
    console.log(
        await paymentrows.count()
    );
    const firstpayment = paymentrows.first();
    console.log(
        'First payment is :' ,
        await firstpayment.innerText()
    );
  // const specifictransaction = page.locator('tr').filter({
  //  hasText : 'PayU S.A.'
   //}).filter({
   // hasText : '-341'
  // });
   const specifictransaction = page.locator('tr').filter({
    hasText : 'PayU S.A.'
    }).filter({
        hasText : 'onlineID:123456'
    });
    console.log('Matching Transaction' ,await specifictransaction.count());
 //  console.log('Matching transaction is :' ,
  //  await specifictransaction.count()
//);
//await expect(specifictransaction).toHaveCount(1);
//const datecell = specifictransaction.locator('td').nth(0);
//console.log(await datecell.innerText());
//await expect(datecell).toHaveText('07.11.22');
    const amountcell = paymentrows.locator('td').nth(3);
    const amount = await amountcell.innerText();
    console.log('Amount is :' , amount);
    await expect(amountcell).toHaveText('-341 ,70 PLN');

//creating negative transaction    
const missingtransaction = page.locator('td').filter({
    hasText : 'onlineID:999999'
});
//console.log('Missed Transsaction :' ,
//    await missingtransaction.count());  
await expect(missingtransaction).toHaveCount(0);  
});