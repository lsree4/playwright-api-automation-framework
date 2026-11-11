import { test , expect } from '@playwright/test';
//writting test case
test ('demo bank login' ,async ({page}) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    //input
    await page.locator('[data-testid="login-input"]').fill('12345678');
    //creating a variable to see the input
    const loginId = await page.locator('[data-testid="login-input"]').inputValue();
    console.log('Login ID is:' , loginId);
    //first assertion for input
    await expect(
        page.locator('[data-testid="login-input"]')
    ).toHaveValue(loginId);
    //input password
    await page.locator('[data-testid="password-input"]').fill('abcdefgh');
    //variable to see the password
    const password= await page.locator('[data-testid="password-input"]').inputValue();
    console.log('password is:' ,password);
    //assertion 2 for the password
    await expect(
        page.locator('[data-testid="password-input"]')
    ).toHaveValue(password);
    await page.locator('[data-testid="login-button"]').click();
    //find the dropdown
    const dropdown = page.locator('#widget_1_transfer_receiver');
    await dropdown.selectOption({
        label: 'Chuck Demobankowy'
    });
    const recipient =await page.locator('#widget_1_transfer_receiver').inputValue();
    console.log('the recepient is :' ,recipient);
    await expect (page.locator('#widget_1_transfer_receiver')
    ).toHaveValue('2');
    //checking the box
    await page.locator('#widget_1_topup_agreement').check();
    await expect(page.locator('#widget_1_topup_agreement')).toBeChecked();
    await page.locator('#widget_1_topup_agreement').uncheck();
    await expect(page.locator('#widget_1_topup_agreement')).not.toBeChecked;
    //Accessing table
    const transaction = page.getByRole('table');
    console.log('Number of tables:' , await transaction.count());
    console.log('Number of Rows :' , await transaction.locator('tr').count());
    const rows = transaction.locator('tr');
    console.log('First row :');
    console.log(await rows.nth(0).innerText());
    //reading cells and displaying the text using console and for loop 
    const firstRow =rows.nth(0);
    console.log(
        'Number of cells :' ,
        await firstRow.locator('td').count()
    );
    const cells = firstRow.locator('td');
    for (let i=0 ; i < await cells.count(); i++) {
        console.log(`cells ${i} :` , await cells.nth(i).innerText());
            
        
    }
    const amount = await cells.nth(3).innerText();
    console.log('Transcation amount is :' , amount);
    const transactions = page.getByRole('table');
    const paymentRow = transactions.locator('tr').filter({
    hasText: 'PayU S.A.'
    });
    await expect(paymentRow).toHaveCount(1);
    const paymentAmount = await paymentRow.locator('td').nth(3).innerText();
    console.log('payment amount is :' ,paymentAmount);
    await expect(
        paymentRow.locator('td').nth(3)).
        toHaveText('-341 ,70 PLN');
    await expect(
        paymentRow.locator('td').nth(2)
    ).toContainText('PayU S.A.');   
    await expect(
        paymentRow.locator('td').nth(0)
    ).toHaveText('07.11.22');
    console.log('Matching PayU Transaction :' ,
        await paymentRow.count()
    );





    //finding the dropdown values
     // const options = await dropdown
    //.locator('option')
    //.allTextContents();
    //console.log('Available Options are:' , options);


    
})

test ('radio button' ,async ({page}) => {
    await page.goto('https://shadcndashboard-demo.vercel.app/pages/form');
    await page.getByRole('radio' ,{name : 'Default'}).check();
    await expect(
        page.getByRole('radio' ,{name : 'Default'})
    ).toBeChecked();
})