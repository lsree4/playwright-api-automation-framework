import { test , expect } from '@playwright/test';
test('Open Link in new tab' , async ({page}) => {
    await page.goto('https://qaplayground.com/practice/tabs-windows');
    console.log('Page Url is ' , page.url());
    const newtablink = page.getByTestId('tw-open-new-tab');
    console.log(
        'Newtab link count :' ,
        await newtablink.count()
    );
    await expect(newtablink).toBeVisible();
    //Start listening for the newtab
    const popuppromise = page.waitForEvent('popup');
    //Click the link
    await newtablink.click();
    //Capture the newly opened tab(page)
    const popup = await popuppromise;
    console.log('Original Url : ' , page.url());
    console.log('After clicking Url :' ,popup.url());
    console.log(
        'pages in context : ' ,
        page.context().pages().length
    );
    await popup.waitForLoadState('domcontentloaded');
    const popupheading = popup.getByRole('heading' ,{
        name : 'How to Handle Tabs and Windows in Selenium and Playwright'
     });
     console.log(
        'popup heading count : ' ,
        await popupheading.count()
     );
     await expect(popupheading).toBeVisible();
        });
test('Scenario 2 open tab a ' , async ({page}) => {
    await page.goto('https://qaplayground.com/practice/tabs-windows');
    //Open Tab A
    const TabAbutton = page.getByTestId('tw-tab-a');
    console.log('Tab A count :', await TabAbutton.count());
    await expect(TabAbutton).toBeVisible();
    const [tabAPage] = await Promise.all([
        page.context().waitForEvent('page'),
        TabAbutton.click(),
    ]);
    await tabAPage.waitForLoadState();
    //Open Tab B
    const TabBbutton = page.getByTestId('tw-tab-b');
    const [TabBpage] = await Promise.all([
        page.context().waitForEvent('page'),
        TabBbutton.click(),
    ]);
    await TabBpage.waitForLoadState();
    //Open Tab C
    const TabCbutton =  page.getByTestId('tw-tab-c');
    const [TabCpage] = await Promise.all([
        page.context().waitForEvent('page'),
       TabCbutton.click(),
    ]);
    await TabCpage.waitForLoadState();
    console.log('TabA Url :', tabAPage.url());
    console.log('TabB Url :', TabBpage.url());
    console.log('TabC Url :', TabCpage.url());

    console.log(
        'pages in context :' ,
        page.context().pages().length
    );
    await expect(tabAPage).toHaveURL(
        'https://qaplayground.com/'
    );
    await expect(TabBpage).toHaveURL(
        'https://qaplayground.com/practice'
    );
    await expect(TabCpage).toHaveURL(
        'https://qaplayground.com/practice/links'
    );
    await expect(page.context().pages()).toHaveLength(4);
});

test('Scenario 3 - Switch back to Original tab' , async ({page}) => {
    await page.goto(
        'https://qaplayground.com/practice/tabs-windows'
    );

    //Keep a reference to the original page

    const originalpage = page;

    // Find |"Open new tab"
    
    const opennewtab = page.getByTestId(
        'tw-open-and-return'
    );
    await expect(opennewtab).toBeVisible();

    //Open the Newtab and capture it

    const [newpage] = await Promise.all([
        page.context().waitForEvent('page'),
        opennewtab.click()
    ]);

    //Wait for the event to load

    await newpage.waitForLoadState();
    console.log(
        'original Url :', originalpage.url()
    );
    console.log(
        'New url :' , newpage.url()
    );

    //Now use the original page again

    const markasreturned = originalpage.getByRole('button' ,
        {name : 'Mark as Returned'}
    );
    await expect(markasreturned).toBeVisible();
    await markasreturned.click();

    //Verify the application says we returned to the original page

    const result = originalpage.getByTestId('result-s03');
    await expect(result).toHaveText(
        'Switched back to original tab ✓'
    );
    console.log('Succesfully switched back to the original page')

});

test('Scenario 4  Asserting URL and the Title ' , async ({page}) => {
    
    //Open QA Playground

    await page.goto('https://qaplayground.com/practice/tabs-windows');

    //Find the real link

    const openAssertTab = page.getByTestId(
        'tw-assert-tab-btn'
    );

    //Verify the link is available

    await expect(openAssertTab).toBeVisible;

    //Wait for the newtab and click the link

    const [newpage] = await Promise.all([
        page.context().waitForEvent('page'),
        openAssertTab.click(),
    ]);

    //Wait for the new tab to load

    await newpage.waitForLoadState('domcontentloaded');

    //Read the URL

    console.log('Newtab URL :', newpage.url());

    //Read the Title

    console.log('New Tab Title :', await newpage.title());

    //Assert the URL

    await expect(newpage).toHaveURL(/qaplayground/);

    //Assert the title

    await expect(newpage).toHaveTitle(/QA/);
});
test('Scenario 5 -CLose a Tab' , async ({page}) => {
    await page.goto(
        'https://qaplayground.com/practice/tabs-windows'
    );
    const openTab = page.getByTestId('tw-close-tab-btn');
    await expect(openTab).toBeVisible();
    const [newpage] = await Promise.all([
        page.context().waitForEvent('page'),
        openTab.click(),
    ]);
    await newpage.waitForLoadState('domcontentloaded');
    await newpage.close();
    console.log(
        'Is the newpage closed ' ,
        newpage.isClosed()
    );
    await expect(newpage.isClosed()).toBeTruthy();
    const markasClosed = page.getByRole('button', {
        name : 'Mark as Closed'
    });
    await markasClosed.click();
    const result = page.getByTestId('result-s05');
    await expect(result).toContainText('Tab closed ');
    console.log('Scenario 5 Completed');
});
test('Scenario 6 - window popup ' , async ({page}) =>{
    await page.goto('https://qaplayground.com/practice/tabs-windows');
    const popupButton = page.getByTestId('tw-popup-btn');
    console.log(
        'Pop up button count :' ,
        popupButton.count());
    await expect(popupButton).toBeVisible();
    const popuppromise = page.waitForEvent('popup');
    await popupButton.click();
    const popup = await popuppromise;
    await popup.waitForLoadState('domcontentloaded');
    console.log('Pop up Url :' ,popup.url());
    console.log('Pop up Title :' , await popup.title());

});