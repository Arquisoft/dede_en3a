import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/access-shop.feature');

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

  test('The user access the shop through the navbar', ({given,when,then}) => {
    
    let email:string
    let username:string

    given('A user on the home page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the Shop button in the navbar', async () => {
      await expect(page).toMatch("Dede, a decentralized ecommerce website");
      await expect(page).toClick('division', { text: 'Shop' })
    });

    then('I am in the Shop page', async () => {
      await expect(page).toMatch('Openning offer')
    });
  })

  test('The user access the shop through the Start Shopping button of Home page',
      ({given,when,then}) => {

    let email:string;
    let username:string;

    given('A user on the home page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the Start Shopping button', async () => {
      await expect(page).toMatch("Dede");
      await expect(page).toClick('division')
    });

    then('I am in the Shop page', async () => {
      await expect(page).toMatch('Openning offer')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});