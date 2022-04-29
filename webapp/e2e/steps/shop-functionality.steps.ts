import {defineFeature, loadFeature} from "jest-cucumber";
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/shop-functionality.feature');

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

    test('The user searches Gel hand sanitizer', ({given,when,then}) => {

        let email:string
        let password:string

        given('A user on the shop page', () => {
            email = "123@123.com"
            password = "123123"
        });

        when('I write "Hand" on the search bar and press the Search button', async () => {
            await page.setViewport({ width: 1400, height: 900 });
            await expect(page).toClick('div[title="shop"]')

            await expect(page).toFill("input[title='searchProduct']", "Hand");

            await expect(page).toClick('button', {text:'Search'})

        });

        then('The only product on screen is the Gel Hand Sanitizer', async () => {

            await expect(page).toMatch("Hand sanitizer")
            await expect(page).not.toMatch("FFP2")
        });
    })

    test('The user adds a product to the cart', ({given,when,then}) => {

        let email:string
        let password:string

        given('A user on the shop page', () => {
            email = "123@123.com"
            password = "123123"
        });

        when('I press the Add to Cart button', async () => {
            await page.setViewport({ width: 1400, height: 900 });
            await expect(page).toClick('div[title="shop"]')
            await expect(page).toClick('div[title="cardItemAddButton"]')

        });

        then('The product is in the cart', async () => {
            await expect(page).toMatch("1")
        });
    })

    afterAll(async ()=>{
        await browser.close()
    })

});