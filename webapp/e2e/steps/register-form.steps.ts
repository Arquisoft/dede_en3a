import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  jest.setTimeout(100000)
  
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo:50}); //false to run tests locally
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
      await expect(page).toFillForm('form[name="loginForm"]',{
        email:email,
        password:password
      })
      await expect(page).toClick('button', {text:'Login'})

    });

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatch('You are logged as:')
    });
  })

  test('The user is not registered in the site',
      ({given,when,then}) => {

    let email:string;
    let password:string;
    let name:string

        given('An unregistered user', () => {
          email = "notregistered@123.com"
          password = "123123"
          name = "notregistered"
        });

        when('I access the register form, fill the data in it and press submit', async () => {
          await page.setViewport({ width: 1400, height: 900 });
          await expect(page).toMatch("Dede, a decentralized ecommerce website");
          await expect(page).toClick('div[title="loginDiv"]')
          await expect(page).toClick('b', {text:'Register'})
          await expect(page).toFillForm('form[name="registerForm"]',{
            email:email,
            name:name,
            password:password,
            confirmPasswd:password
          })
          await expect(page).toClick('button', {text:'Register'})

        });

        then('A confirmation message should be shown in the screen', async () => {
          await expect(page).toMatch('You are logged as:')
        });
  })

  afterAll(async ()=>{
    await browser.close()
  })

});