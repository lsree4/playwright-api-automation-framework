import { test , expect } from '@playwright/test';
test('Authenticate and save session' , async({page}) =>{
    await page.goto('https://demo-bank.vercel.app/');
    const usernameinput = page.getByTestId('login-input');
    await usernameinput.fill('13456782');
    const userpassword = page.getByTestId('password-input');
    await userpassword.fill('asdfghjk');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    console.log('current url' , page.url());
    console.log('page title',await page.title());
    console.log('Page content',await page.locator('body').innerText());
    await expect(page).toHaveURL(/pulpit\.html/);
    await page.context().storageState({ path : 'auth-state.json'});
});