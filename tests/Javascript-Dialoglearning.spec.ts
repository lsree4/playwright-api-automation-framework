import { test , expect } from '@playwright/test';
test.beforeEach(async({page}) =>{
    await page.goto('https://lab.hakdogan.com/practice/javascript-alerts/');
});
test('Dialog alert' , async({page}) =>{
    
   const dialogpromise = page.waitForEvent('dialog').then(
    async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('Deployment queued.');
        await dialog.accept();
        return dialog;
    });
   
    await page.getByTestId('js-alert-trigger').click();
    
    await dialogpromise;
   
   });

test('Scenario 2 Confirm OK' , async ({page}) => {
    const dialogpromise = page.waitForEvent('dialog').then(
        async dialog =>{
            expect(dialog.type()).toBe('confirm');
            console.log('Alert message :' , dialog.message());
            expect(dialog.message()).toBe('Approve production deploy?');
            await dialog.accept();
            return dialog;
        }
    )
    await page.getByTestId('js-confirm-trigger').click();
    await dialogpromise;
});

test('Scenario 3 Confirm Cancel' , async({page}) => {
    const dialogpromise = page.waitForEvent('dialog').then(
        async dialog =>{
            expect(dialog.type()).toBe('confirm');
            await dialog.dismiss();
            return dialog;
        }

    );
    await page.getByTestId('js-confirm-trigger').click();
    await dialogpromise;
});

test('Scenario 4 Prompt' , async({page}) =>{
    const dialogpromise = page.waitForEvent('dialog').then(
        async dialog =>{
            expect(dialog.type()).toBe('prompt');
            await dialog.accept('Playwright Learner');
            return dialog;
        }
    )
    await page.getByTestId('js-prompt-trigger').click();
    await dialogpromise;
    const Promresult = page.getByTestId('js-prompt-value');
    await expect(Promresult).toContainText('Playwright Learner');
});
