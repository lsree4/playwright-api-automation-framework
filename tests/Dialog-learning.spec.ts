import { test , expect } from '@playwright/test';
test.beforeEach( async ({page}) =>{
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('12345678');
    await page.getByTestId('password-input').fill('asdfghjk');
    await page.getByRole('button', { name : 'Zaloguj się'}).click();
    await page.waitForURL('**/pulpit.html');
});
test('Handle Transfer confirmation Dialog' , async ({page}) =>{
    await page.goto('https://demo-bank.vercel.app/quick_payment.html');
    //Fill the Form

    await page.locator('#widget_1_transfer_receiver').selectOption('1');
    await page.locator('#widget_1_transfer_amount').fill('1');
    await page.locator('#widget_1_transfer_title').fill('pr');

    await page.locator('#execute_btn').click();
    
    const transferModal = page.getByRole('dialog');
    await expect(transferModal).toBeVisible();
    await expect(transferModal).toContainText('Przelew wykonany!');
    await expect(transferModal).toContainText('Jan Demobankowy');
    await expect(transferModal).toContainText('1,00PLN');
    await expect(transferModal).toContainText('pr');
    await transferModal.getByTestId('close-button').click();
    await expect(transferModal).not.toBeVisible();
    
});

test('Scenario - 1' , async ({ page}) => {
    await page.goto('https://qaplayground.com/practice/alerts-dialogs');
    const openinfobutton = page.getByTestId('open-info-dialog');
    await openinfobutton.click();
    const infodialog = page.getByTestId('info-alert-dialog');
    await expect (infodialog).toBeVisible();
    await expect(infodialog.getByRole('heading')).toHaveText('Session Notice');
    await infodialog.getByTestId('info-dialog-close-btn').click();
    await expect(infodialog).not.toBeVisible();
    

});

test('Scenario 2 Confirm action dialog' , async({page}) =>{
    await page.goto('https://qaplayground.com/practice/alerts-dialogs');
    const Infobutton = await page.getByTestId('open-confirm-dialog').click()
    const confirmModal = page.getByRole('dialog');
    await expect(confirmModal).toBeVisible();
    await expect(confirmModal.getByRole('heading')).
    toHaveText('Confirm Submission');
    await confirmModal.getByTestId('confirm-ok-btn').click();
    await expect(page.getByTestId('result-s02')).
    toHaveText('Submission confirmed!');
    await expect(confirmModal).not.toBeVisible();
})

test('Scenario Sub2 Cancel Request', async({page}) =>{
    await page.goto('https://qaplayground.com/practice/alerts-dialogs');

    //Capture the result before capturing

    const result = page.getByTestId('result-s02');
    const resultbefore = (await result.innerText()).trim();
    //Open the confirmation modal
    await page.getByTestId('open-confirm-dialog').click();
    const confirmation = page.getByRole('dialog');
    await expect(confirmation).toBeVisible();
    
    //Cancel the modal

    await confirmation.getByTestId('confirm-cancel-btn').click();
    await expect(confirmation).not.toBeVisible();
    await expect(result).toHaveText(resultbefore);

});
test('Scenario 3' , async({page}) => {
    await page.goto('https://qaplayground.com/practice/alerts-dialogs');
    await page.getByTestId('open-unsaved-dialog').click();
    const openresult = page.getByRole('dialog');
    await expect(openresult).toBeVisible();
    await openresult.getByTestId('stay-on-page-btn').click();
    await expect(openresult).not.toBeVisible();
    await expect(page).toHaveURL('https://qaplayground.com/practice/alerts-dialogs');
});
test('Scenario 4' , async({page}) =>{
    await page.goto('https://qaplayground.com/practice/alerts-dialogs');
    await page.getByTestId('open-delete-dialog').click();
    const deletebutton = page.getByRole('dialog');
    await expect(deletebutton).toBeVisible();
    await deletebutton.getByRole('button' ,
         { name : 'Confirm account deletion'}).click();
    await expect(deletebutton).not.toBeVisible();
    await expect(page).toHaveURL('https://qaplayground.com/practice/alerts-dialogs');
})
test('Scenario 5' , async({page}) =>{
    await page.goto('https://qaplayground.com/practice/alerts-dialogs');
    await page.getByTestId('open-backdrop-dialog').click();
    //Locate the outer container 

    const backdropdialog = page.getByTestId('backdrop-dismiss-dialog');

    //Locate the inner whitebox

    const dialogbox = page.getByTestId('backdrop-dialog-box');

    //Verify both elements are visible

    await expect(backdropdialog).toBeVisible();
    await expect(dialogbox).toBeVisible();

    //Verify the heading

    await expect(dialogbox.getByRole('heading')).
    toHaveText('Dismiss by Clicking Outside');

    //Click the dark background outside the box

    await backdropdialog.click({
        position : {x : 10 , y : 10}
    });
    await expect(backdropdialog).not.toBeVisible();
})