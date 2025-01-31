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


