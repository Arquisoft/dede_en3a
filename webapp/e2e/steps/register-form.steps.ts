import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import {apps} from "firebase-functions/lib/apps";
import delay = apps.delay;

const feature = loadFeature('./e2e/features/register-form.feature');

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

  test('The user is registered in the site', ({given,when,then}) => {
    
    let email:string
    let password:string

    given('A registered user', () => {
      email = "123@123.com"
      password = "123123"
    });

    when('I fill the data in the form and press login', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toMatch("Dede, a decentralized ecommerce website");
      await expect(page).toClick('div[title="loginTopMenu"]')

      await expect(page).toFill("input[title='email']", email);
      await expect(page).toFill("input[title='password']", password);

      await expect(page).toClick('button', {text:'Login'})
      await expect(page).toClick('div[title="orders"]')

    });

    then('The orders of this client are available', async () => {

      await delay(3000);
      await expect(page).toClick('div[title="orders"]')
      await expect(page).toMatch("Orders")//There is an order in the account of this user
    });
  })

  test('The user is not registered in the site',
      ({given,when,then}) => {

    let email:string;
    let password:string;
    let name:string

        given('An unregistered user', () => {
          email = (Math.random() + 1).toString(36) + "@123.com"
          password = "123123"
          name = "notregistered"
        });

        when('I access the register form, fill the data in it and press submit', async () => {
          await page.setViewport({ width: 1400, height: 900 });
          await expect(page).toClick('div[title="home"]')
          await expect(page).toClick('div[title="loginTopMenu"]')
          await expect(page).toClick('b[title="register"]')

          await expect(page).toFill("input[title='emailInput']", email);
          await expect(page).toFill("input[title='nameInput']", name);
          await expect(page).toFill("input[title='passwordInput']", password);
          await expect(page).toFill("input[title='confirmInput']", password);

          await expect(page).toClick('button', {text:'Register'})

        });

        then('A confirmation message should be shown in the screen', async () => {
          await expect(page).toClick('div[title="orders"]')
          await expect(page).not.toMatch("Date:")
        });
  })

  test('The user does an incorrect login', ({given,when,then}) => {

    let email:string
    let password:string

    given('A registered user', () => {
      email = "123@123.com"
      password = "dasfasdfasd"
    });

    when('I login with a wrong account', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toClick('div[title="home"]')
      await expect(page).toClick('div[title="loginTopMenu"]')

      await expect(page).toFill("input[title='email']", email);
      await expect(page).toFill("input[title='password']", password);

      await expect(page).toClick('button', {text:'Login'})
    });

    then('An error message appears', async () => {
      await expect(page).toMatch("Provided email not found or wrong password, try again...")
    });
  })

  afterAll(async ()=>{
    await browser.close()
  })

});