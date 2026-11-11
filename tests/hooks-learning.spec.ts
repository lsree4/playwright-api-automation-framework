import { test , expect } from '@playwright/test';
test.beforeAll(async  () =>{
    console.log('Before all is running');
});
test.beforeEach(async ({page}) => {
    console.log('Before Each is Running');
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('12345678');
    await page.getByTestId('password-input').fill('asdfghjk');
    await page.getByRole('button', {name: 'Zaloguj się'}).click();
    await page.waitForURL('**/pulpit.html');
    });
test.afterEach(async ({page}) => {
    console.log('Test finished URL :' , page.url());
});
test.afterAll( async () =>{
    console.log('After all is running');
});

test('Download page', async ({ page }) => {
  await page.goto(
    'https://demo-bank.vercel.app/reports-iframe.html'
  );

  const reportFrame = page.frames().find(
    frame => frame.url().includes('reports-iframe-content.html')
  );

  expect(reportFrame).toBeDefined();

  const downloadLink = reportFrame!.locator('#btn_dl_txt');

  console.log(
    'Download link in correct frame:',
    await downloadLink.count()
  );

  const downloadPromise = page.waitForEvent('download');

  await downloadLink.click();

  const download = await downloadPromise;

  console.log(
    'Suggested filename:',
    download.suggestedFilename()
  );
});
test('Check transaction table' , async ({page}) =>{
    console.log('Test Two');
    const rows = page.locator('tr');
    await expect(rows).toHaveCount(5);
});

