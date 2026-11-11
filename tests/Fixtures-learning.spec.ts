import { test , expect } from '@playwright/test';
test('Scenario 1 Understanding the fixtures' , async ({page}) =>{
    await page.goto('https://example.com');
});
test('Scenario 2 Check test Isolation' , async({page}) =>{
     await expect(page).toHaveURL('about:blank');
});
test.describe('beforeEach and test isolation' , () => {
    test.beforeEach(async ({page}) =>{
        await page.goto('https://example.com');
    });
    test('Scenario 3 - Verify the page URL' , async({page}) =>{
        await expect(page).toHaveURL('https://example.com');
    });
    test('Scenario 4 - Verify the page Heading' , async({page}) =>{
       // await expect(page.getByRole('heading', {name : 'Example Domain'})).
       // toBeVisible();
        console.log('Current URL' , page.url());
        console.log('page tittle' ,await page.title());
        console.log('H1 Count' , await page.locator('h1').count());
        //console.log('Body text:', await page.locator('body').innerText());
        await expect(page.locator('body'))
    .toContainText('This domain is for use in documentation examples');
    });
   
} );