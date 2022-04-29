import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import {apps} from "firebase-functions/lib/apps";
import delay = apps.delay;

const feature = loadFeature('./e2e/features/buy.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  jest.setTimeout(100000)
  
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo:100}); //false to run tests locally
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user buys something in the shop', ({given,when,then}) => {
    
    let email:string
    let password:string

    given('A not logged user on the home page', () => {
      email = "123@123.com"
      password = "123123"
    });

    when('I open the profile and login, add a product to the cart, enter my POD and buy it', async () => {
      await page.setViewport({ width: 1400, height: 900 });

      //Login
      await expect(page).toClick('div[title="loginTopMenu"]')
      await expect(page).toFill("input[title='email']", email);
      await expect(page).toFill("input[title='password']", password);
      await expect(page).toClick('button', {text:'Login'})

      //Add product
      await expect(page).toClick('div[title="shop"]')
      //await expect(page).toFill("input[title='searchProduct']", "ffp2");
      //await expect(page).toClick('button', {text:"Search"})
      await expect(page).toClick('div[title="cardItemAddButton"]')

      //Go to the cart
      await expect(page).toClick('div[title="contact"]')
      await expect(page).toClick('span[title="cart"]')
      await expect(page).toMatch("Continue") //It finds this ??????
      //await expect(page).toClick('button')
      await expect(page).toClick('button', {text:'Continue'})

      //Introduce the POD
      await expect(page).toFill('input', "https://paoloxx4.solidweb.org/profile/card#me")
      await expect(page).toClick('button', {text:'Get POD'})

      //Check out
      await delay(5000);
      await expect(page).toClick('button', {text:'Checkout'})
      await expect(page).toClick('div[data-funding-source="paypal"]')

      //Payment
      await expect(page).toFill('input[id="email"]', "sb-np47tu15929938@personal.example.com")
      await expect(page).toFill('input[id="password"]', "uZA?6hP!")
      await expect(page).toClick('button', {text:'Pagar ahora'})

    });

    then('The product is correctly bought', async () => {

      await delay(3000);
      await expect(page).toMatch("Your order was sucessful!")//There is an order in the account of this user
    });

  })

  afterAll(async ()=>{
    await browser.close()
  })

});