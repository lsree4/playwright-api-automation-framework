import { test , expect } from '@playwright/test';
test ('locator chaining' , async ({page}) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('12345678');
    await page.getByTestId('password-input').fill('asdfghjk');
    await page.getByRole('button' , {name : 'Zaloguj się'}).click();
    //Waiting for the dashboard to load
    await page.waitForURL('**/pulpit.html');
    console.log('Current URL :' ,page.url());
    const paymentdescription = page.getByText(
        'PayU S.A., Płatność onlineID:123456 PayU w Allegro'
    );
    console.log('Description Matches :' , await paymentdescription.count());
    const transactionRow = page.locator('tr').filter({
  has: paymentdescription
});

console.log(
  'Transaction rows found:',
  await transactionRow.count()
);
const parent = paymentdescription.locator('..');
console.log('Parent Count :' , await parent.count());
console.log('Parent text ', await parent.innerText());
const row = parent.locator('..');
console.log('row text :' , await row.innerText());
const transaction = page
.locator('tr')
.filter({has : paymentdescription})
.filter({ hasText: '-341 ,70 PLN'});
console.log('matching transaction :' ,await transaction.count());
const nonpayu = page
.locator('tr')
.filter({hasNotText : 'PayU S.A.'});
console.log(
    'rows without Payu :' , 
    await nonpayu.count()
);




    //const rows = page.locator('tr');
    //console.log('Number of rows :', await rows.count());
    //for(let i=0 ; i < await rows.count(); i++ ){
    //    console.log(`Rows ${i}`,await rows.nth(i).innerText());
//
  //  }
    //const transaction = await page.locator('tr').filter({
      //  hasText : 'onlineID:123456'
    //});
//    console.log('Number of transactions :', await transaction.count());
  //  const cells = transaction.locator('td');
    //console.log('Number of cells : ' ,await cells.count());
//    const amountcell = transaction.locator('td').nth(3);
    
  //  await expect(amountcell).toHaveText('-341 ,70 PLN');
});