import { test , expect } from '@playwright/test';
test.use({ storageState : 'auth-state.json'});
test('Reuse saved session and openthe Dashboard' , async({page}) =>{
    await page.goto('https://demo-bank.vercel.app/pulpit.html');
    await expect(page).toHaveURL(/pulpit\.html/);
    await expect(
    page.getByRole('heading', { name: 'szybki przelew', exact: true })
).toBeVisible();;
});