import { test , expect } from '@playwright/test' ;
import { existsSync ,mkdirSync , readFileSync } from 'node:fs';
import {join} from 'node:path' ;
test.beforeEach(async ({page}) => {
    console.log('Before Each is Running');
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('12345678');
    await page.getByTestId('password-input').fill('asdfghjk');
    await page.getByRole('button', {name: 'Zaloguj się'}).click();
    await page.waitForURL('**/pulpit.html');
    });

test('Downloadfile', async ({page}) =>{
    //Goto the reports page
    await page.goto(
        'https://demo-bank.vercel.app/reports-iframe.html'
    );
    console.log('Current URL :',page.url());
    //Find the correct iFrame
    const reportFrame = page.frames().find(
        frame => frame.url().includes('reports-iframe-content.html')
    );
    //Make Sure the frame was found
    expect(reportFrame).toBeDefined();
    //Find the download link inside the iFrame
    const downloadLink = reportFrame!.locator('#btn_dl_txt');
    console.log(
        'Download link count is :' ,
        await downloadLink.count()
    );
    //Make sure the link is visible
    await expect(downloadLink).toBeVisible();
    //wait for the download event
    const downloadPromise = page.waitForEvent('download');
    //Click the download link
    await downloadLink.click();
    //Get the doenloaded file
    const download = await downloadPromise;
    console.log(
        'Suggested filename :',
        download.suggestedFilename()
    );
    //create download folder if it doesnot exist
    const downloaddir = 'downloads';
    if(!existsSync(downloaddir)){
        mkdirSync(downloaddir);
    }
    //create full file path
    const filepath = join(
        downloaddir,
        download.suggestedFilename()
    );
    //save the file
    await download.saveAs(filepath);
    console.log('File save path :' ,filepath);
    //verify file exists
    expect(existsSync(filepath)).toBeTruthy();
    const filecontent = readFileSync(filepath ,'utf8');
    console.log('Download file content');
    console.log(filecontent);
    expect(filecontent).toMatch(/2021\.01\.01\s+412/);
    expect(filecontent).toMatch(/2021\.06\.01\s+512/);
});