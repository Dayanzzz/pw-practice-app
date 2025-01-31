// import {test} from '@playwright/test'
// //ADD HOOK!!! FOR REPETITIVE



// test.beforeEach(async({page}) => {
//     await page.goto('http://localhost:4200/')
//     // exectued for everytest
//     // await page.getByText('Forms').click()
// })
// // define test case named first test
// // {page} argument is provided by test runner to 
// // represent new browser page instaance
// // test('the first test', async ({page})=>{
// //     //navigate the browser to here
// // // await page.goto('http://localhost:4200/')
// // //find element containging the text Forms and clicks it
// // // playwright wwill wait for element to be visible and interactable
// // // clicks on link to form 
// // // await page.getByText('Forms').click()
// // //finds element containing text datepicker and clicks it
// // // assumes the clicking forms previously revealed or led to datepicker
// // await page.getByText('Form Layouts').click()
// // })




// // test('navigate to datepicker page', async ({page})=>{
// //     // await page.goto('http://localhost:4200/')
// //     // await page.getByText('Forms').click()
// //     await page.getByText('Datepicker').click()
// // })

// test.describe('suite1', ()=>{
//     test.beforeEach(async({page})=>{
//         await page.getByText('Charts').click()
//     })
//     // this before hook will only be executed before these two tasks below

//     test('the first test', async ({page})=>{
//         await page.getByText('Form Layouts').click()
//     })
//     test('navigate to datepicker page', async ({page})=>{
//         // await page.goto('http://localhost:4200/')
//         // await page.getByText('Forms').click()
//         await page.getByText('Datepicker').click()
//     })
// })






// test.describe('suite1', ()=>{
//     test.beforeEach(async({page})=>{
//         // this before each only executes for the two tests below 
//         await page.getByText('Forms').click()
//     })

//     test('the first test1', async ({page})=>{
//         await page.getByText('Form Layouts').click()
//     })

//     test('navigate to datepicker page', async ({page})=>{
//         await page.getByText('Datepicker').click()
//     })
// })


// //this code is repetative , use hooks !!!


const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // wait for the first set of articles to load
  await page.waitForSelector('.age');

  let articles = new Map(); // HashMap to store unique articles based on timestamp
  let totalArticles = 0;

  // Function to get timestamps and store in the hashmap
  async function loadArticles() {
    const timestamps = await page.$$eval('.age', (elements) => {
      return elements.slice(1, 30).map(el => {
        const timestampStr = el.getAttribute('title');
        const unixTimestamp = parseInt(timestampStr.split(' ')[1]);
        return unixTimestamp;
      });
    });

    // Store timestamps in the HashMap to ensure uniqueness
    timestamps.forEach((timestamp) => {
      if (!articles.has(timestamp) && totalArticles < 100) {
        articles.set(timestamp, true);
      }
    });

    totalArticles = articles.size; // Update total articles count
    console.log("Loaded articles:", totalArticles);
  }

  // Load first set of articles
  await loadArticles();

  // Keep clicking 'More' button and loading articles until we have 100 unique articles
  while (totalArticles < 100) {
    // Click the "More" button to load more articles
    await page.click('.morelink');
    await page.waitForTimeout(1000); // Wait for the new articles to load (adjust if needed)

    // Load the next set of articles
    await loadArticles();
  }

  console.log("Total unique articles loaded:", totalArticles);

  // Extract the first 100 timestamps and check if they are sorted in descending order
  const timestampsArray = Array.from(articles.keys()).slice(0, 100); // Limit to 100 articles
  const isDescending = timestampsArray.every((ts, index, arr) => index === 0 || ts <= arr[index - 1]);

  console.log("Timestamps:", timestampsArray);
  console.log("Sorted in descending order:", isDescending);

  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();


