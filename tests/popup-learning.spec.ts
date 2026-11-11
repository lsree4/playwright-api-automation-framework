import { test , expect } from '@playwright/test';
test( 'Popup understainding' , async ({page}) =>{
    await page.setContent(`
    <html>
      <body>
        <h1>Main Page</h1>

        <button onclick="window.open('https://example.com', '_blank')">
          Open new tab
        </button>
      </body>
    </html>
  `);
  console.log('Mainpage URL :' , page.url());
  console.log('Pages in context before popup :' ,
    page.context().pages().length
  );
  const popuppromise = page.waitForEvent('popup');
  await page.getByRole('button' , { name : 'open new tab'}).click();
  const popup = await popuppromise;
  console.log('Popup URL : ', popup.url());
  console.log('Popup Title ', await popup.title());
  const heading = popup.getByRole('heading',{name : 'Example Domain'});
  console.log('Heading Count ', await heading.count());
  await expect(heading).toBeVisible();
  console.log('Pages in context after popup :' ,
    page.context().pages().length
  );
  console.log(
  'Same context:',
  popup.context() === page.context()
);

console.log(
  'Original page URL:',
  page.url()
);

console.log(
  'Popup URL:',
  popup.url()
);
  console.log('Popup URL is :' ,popup.url());
  await expect(popup).toHaveTitle(/Example Domain/);
});