import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/access-shop.feature/Accessing the shop');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true}); //false to run tests locally
    page = await browser.newPage();

    await page
      .goto("https://dede-en3a.web.app/home", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user access the shop through the navbar', ({given,when,then}) => {
    
    let email:string;
    let username:string;

    given('A user on the home page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the Shop button in the navbar', async () => {
      await expect(page).toMatch("Dede");
      await expect(page).toClick('button', { text: 'Shop' })
    });

    then('I am in the Shop page', async () => {
      await expect(page).toMatch('Openning offer')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});