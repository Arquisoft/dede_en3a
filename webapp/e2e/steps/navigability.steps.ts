import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/navigability.feature');

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

  test('The user access the about us section of the navbar', ({given,when,then}) => {

    let email:string
    let username:string

    given('A user on the home page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the About Us button in the navbar', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toClick('div[title="about"]')
    });

    then('I am in the About Us page', async () => {
      await expect(page).toMatch('About us')
    });
  })

  test('The user access the contact section of the navbar', ({given,when,then}) => {

    let email:string
    let username:string

    given('A user on the About Us page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the Contact button in the navbar', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toClick('div[title="contact"]')
    });

    then('I am in the Contact page', async () => {
      await expect(page).toMatch('Contact')
    });
  })

  test('The user access the orders section of the navbar', ({given,when,then}) => {

    let email:string
    let username:string

    given('A user on the contact page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the Orders button in the navbar', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toClick('div[title="orders"]')
    });

    then('I am in the Orders page', async () => {
      await expect(page).toMatch('Orders')
    });
  })

  test('The user access the home page', ({given,when,then}) => {

    let email:string
    let username:string

    given('A user on the orders page', () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when('I press the home button in the navbar', async () => {
      await page.setViewport({ width: 1400, height: 900 });
      await expect(page).toClick('div[title="home"]')
    });

    then('I am in the home page', async () => {
      await expect(page).toMatch('Dede, a decentralized ecommerce website')
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
          await expect(page).toMatch("Dede, a decentralized ecommerce website");
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