import { test , expect }  from "@playwright/test";
import * as XLSX from 'xlsx';
          //Read the Excel file
const workbook = XLSX.readFile('test-data/Input.xlsx');
            //Select Sheet 1
const worksheet = workbook.Sheets['Sheet1'];
            //Convert excel input into typescript objects
const data = XLSX.utils.sheet_to_json<{
    'First Name' : string;
    'Last Name' : string;
    'Postal Code' : string;
}>(worksheet);
data.forEach((row) =>

test(`complete purchase - ${row['First Name']}` , async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await expect(
        page.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill(row['First Name']);
    await page.locator('[data-test="lastName"]').fill(row['Last Name']);
    await page.locator('[data-test="postalCode"]').fill(row['Postal Code']);
    await expect(
        page.locator('[data-test="firstName"]')
    ).toHaveValue(row['First Name']);
    await expect(
        page.locator('[data-test="lastName"]')
    ).toHaveValue(row['Last Name']);
    await expect(
        page.locator('[data-test="postalCode"]')
    ).toHaveValue(row['Postal Code']);
    await page.screenshot({
        path: `screenshots/${row['First Name']}-customer-details.png`,
        fullPage : true
    });

    
    await page.locator('[data-test="continue"]').click();
    await expect(
        page.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="finish"]').click(); 
    await expect(
        page.locator('[data-test="complete-header"]')
    ).toHaveText('Thank you for your order!');

    
}));
    




