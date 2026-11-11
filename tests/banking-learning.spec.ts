import { test , expect } from '@playwright/test';
test ( 'Bank testing' , async ({page}) => {
    //URL
    await page.goto('https://parabank.parasoft.com/parabank/');
    //LOGIN PAGE
    await page.locator('[name="username"]').fill('john');
    await page.locator('[name="password"]').fill('demo');
    await page.locator('[value="Log In"]').click();
    //ASSERTION  1
    await expect(
        page.getByRole('heading' , {name : 'Accounts Overview'})
    ).toBeVisible();
    await page.getByRole('link' , { name : '13344'}).click();
    //ASSERTION 2
    await expect(
        page.getByRole('heading' , { name : 'Account Details'})
    ).toBeVisible();
    const balance = page.locator('#balance');
    const balancetext = await balance.textContent();
    console.log(
        await balance.evaluate(Element => Element.outerHTML)
    );
    
});