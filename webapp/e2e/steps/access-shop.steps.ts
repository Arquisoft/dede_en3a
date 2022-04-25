import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/access-shop.feature');

let page: puppeteer.Page;
let context: puppeteer.BrowserContext;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  jest.setTimeout(100000)
  
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo:0}); //false to run tests locally

    context = await browser.createIncognitoBrowserContext()
    page = await context.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  afterEach(async () => {
    if( page ){
      await page.close();
    }
    if(context){
      await context.close()
    }

    context = await browser.createIncognitoBrowserContext()
    page = await context.newPage();

  });

  test('The user access the shop through the navbar', ({given,when,then}) => {

    let email:string
    let username:string

    given('A user on the home page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the Shop button in the navbar', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toMatch("Dede, a decentralized ecommerce website");
      await expect(page).toClick('div[title="shop"]')
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
      await page.setViewport({ width: 1400, height: 900 });
      //await expect(page).toMatch("Dede, a decentralized ecommerce website");
      await expect(page).toClick('div[title="startShopping"]')
    });

    then('I am in the Shop page', async () => {
      await expect(page).toMatch('Openning offer')
    });
  })

  afterAll(async ()=>{
    await browser.close()
  })

});