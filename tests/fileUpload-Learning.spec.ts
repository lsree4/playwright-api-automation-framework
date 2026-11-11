import { test , expect } from '@playwright/test';
const sampleFilepath = 'tests/Sample-upload.txt';
console.log(sampleFilepath);
test('Scenario 1' , async({page}) =>{
    await page.goto('https://qaplayground.com/practice/file-upload');
    const inputfile = page.getByTestId('fu-single-input');
    await inputfile.setInputFiles(sampleFilepath);
    const uploadresult = page.getByTestId('result-s01');
    await expect(uploadresult).toBeVisible();
    await expect(uploadresult).toContainText('Sample-upload.txt');
});

test('Scenario 2' , async ({page}) =>{
    await page.goto('https://qaplayground.com/practice/file-upload');
    const multiplefiles = page.getByTestId('fu-multi-input');
    await multiplefiles.setInputFiles([
        'tests/Sample-upload.txt' ,
        'tests/Sample-upload2.txt'
    ]);
    const uploadoutput = page.getByTestId('result-s02');
    await expect(uploadoutput).toBeVisible();
    await expect(uploadoutput).toContainText('2 file(s) selected');
    await expect(uploadoutput).toContainText('Sample-upload.txt');
    await expect(uploadoutput).toContainText('Sample-upload2.txt');


});
test('Scenario 3 Clearing the file' , async ({page}) =>{
    await page.goto('https://qaplayground.com/practice/file-upload');
    const inputfile = page.getByTestId('fu-single-input');
    await inputfile.setInputFiles(sampleFilepath);
    await inputfile.setInputFiles([]);
    await expect(inputfile).toHaveValue('');
});
test('Scenario 4 Drag and Drop' , async({page}) =>{
    await page.goto('https://qaplayground.com/practice/file-upload');
    const dropinput = page.getByTestId('fu-drop-input');
    await dropinput.setInputFiles(sampleFilepath);
    const dropresult = page.getByTestId('result-s04');
    await expect(dropresult).toBeVisible();
    await expect(dropresult).not.toContainText('No file dropped');
});

test('Scenario 5 File type restriction ' , async ({page}) =>{
    await page.goto('https://qaplayground.com/practice/file-upload');
    const filetype = page.getByTestId('fu-type-input');
    await filetype.setInputFiles(sampleFilepath);
    const fileresult = page.getByTestId('result-s05');
    await expect(fileresult).toBeVisible();
    console.log(await fileresult.innerText());
    await expect(fileresult).toContainText('rejected');
})

test('Scenario 6 Size Validation' , async({page}) =>{
    await page.goto('https://qaplayground.com/practice/file-upload');
    const sizelimit = page.getByTestId('fu-size-input');
    await sizelimit.setInputFiles('tests/Large-upload.txt');
    const limitresult = page.getByTestId('result-s06');
    await expect(limitresult).toBeVisible();
    console.log(await limitresult.innerText());
    await expect(limitresult).toContainText('exceeds 2 MB');
})