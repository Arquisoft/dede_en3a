import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import {apps} from "firebase-functions/lib/apps";
import delay = apps.delay;

const feature = loadFeature('./e2e/features/POD.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  jest.setTimeout(100000)
  
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo:0}); //false to run tests locally
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user introduces their POD', ({given,when,then}) => {
    
    let email:string

    given('A user', () => {
      email = "123@123.com"
    });

    when('I go to the cart and introduce the POD', async () => {
      await page.setViewport({ width: 1400, height: 900 });

      await expect(page).toClick('span[title="cart"]')
      await expect(page).toClick('button', {text:'Continue'})
      await delay(5000)

      //Introduce the POD
      await expect(page).toFill('input', "https://paoloxx4.solidweb.org/profile/card#me")
      await expect(page).toClick('button', {text:'Get POD'})

      await delay(5000);

    });

    then('The checkout button appears', async () => {
      await expect(page).toMatch("Checkout")
    });

  })

  afterAll(async ()=>{
    await browser.close()
  })

});