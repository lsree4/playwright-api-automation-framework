import { expect, test  } from '@playwright/test';
test ( 'compare load states ' , async ({page}) => {
  const start = Date.now();
  await page.goto('https://demo-bank.vercel.app/');
  await page.waitForLoadState('domcontentloaded');
  const DomcontentLoadedtime = Date.now() - start ;
  console.log(
    'Domcontent loadtime is :' ,
    DomcontentLoadedtime,
    'ms'
  );
  
  await page.waitForLoadState('load');
  const loadtime = Date.now() - start;
  console.log(
    'Time to Load is :' ,
    loadtime ,
    'ms'
  );
  const inputs = page.locator('.login-input');
  console.log('Number of login inputs :' , await inputs.count());
  for(let i = 0 ; i < await inputs.count() ; i++){
    console.log(
      i,
      'type = ', await inputs.nth(i).getAttribute('type'),
      'id = ', await inputs.nth(i).getAttribute('id'),
      'name = ' , await inputs.nth(i).getAttribute('name')
    );
  }
const textbox = page.getByRole('textbox');
console.log('Nuber of textboxes are : ' , await textbox.count());
const loginbutton = page.getByRole('button' ,{name : 'Zaloguj się'});
console.log(
  'Number of Login buttons  :' , await loginbutton.count()
);
await page.getByTestId('login-input').fill('12345678');
await page.getByTestId('password-input').fill('asdfghjk');
await expect(
  page.getByRole('button' ,{name : 'Zaloguj się'}
));
const heading = page.getByRole('heading');
console.log('Number of buttons : ' ,await heading.count());
console.log('Number of buttons ', await heading.allInnerTexts());
const securitytest = page.getByText('Bezpieczeństwo');
console.log(
  'Number of Elements containing this text :' ,
   await securitytest.count()
);
const word = page.getByText('Demobank');
console.log('Number of  demobank elements :' ,await word.count());
const loginInput = page.getByTestId('login-input');

console.log(
  'Number of login inputs:',
  await loginInput.count()
);

await expect(loginInput).toBeVisible();
});