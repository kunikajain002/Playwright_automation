# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: WebApiPart2.spec.js >> @Web Practice Playwright Test
- Location: tests\WebApiPart2.spec.js:25:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.card-body b').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - text:    
  - generic [ref=e25]:
    - paragraph [ref=e26]: Home | Search
    - heading "Filters" [level=4] [ref=e28]
    - generic [ref=e29]:
      - textbox "search" [ref=e31]
      - generic [ref=e32]:
        - heading "Price Range" [level=6] [ref=e33]
        - generic [ref=e34]:
          - textbox "Min Price" [ref=e36]
          - textbox "Max Price" [ref=e38]
      - generic [ref=e39]:
        - heading "Categories" [level=6] [ref=e40]
        - generic [ref=e41]: 
        - generic [ref=e43]:
          - checkbox [ref=e44]
          - generic [ref=e45]: fashion
        - generic [ref=e46]:
          - checkbox [ref=e47]
          - generic [ref=e48]: electronics
        - generic [ref=e49]:
          - checkbox [ref=e50]
          - generic [ref=e51]: household
      - generic [ref=e52]:
        - heading "Sub Categories" [level=6] [ref=e53]
        - generic [ref=e54]: 
        - generic [ref=e56]:
          - checkbox [ref=e57]
          - generic [ref=e58]: t-shirts
        - generic [ref=e59]:
          - checkbox [ref=e60]
          - generic [ref=e61]: shirts
        - generic [ref=e62]:
          - checkbox [ref=e63]
          - generic [ref=e64]: shoes
        - generic [ref=e65]:
          - checkbox [ref=e66]
          - generic [ref=e67]: mobiles
        - generic [ref=e68]:
          - checkbox [ref=e69]
          - generic [ref=e70]: laptops
      - generic [ref=e71]:
        - heading "Search For" [level=6] [ref=e72]
        - generic [ref=e73]: 
        - generic [ref=e75]:
          - checkbox [ref=e76]
          - generic [ref=e77]: men
        - generic [ref=e78]:
          - checkbox [ref=e79]
          - generic [ref=e80]: women
  - generic [ref=e81]:
    - generic [ref=e82]:
      - generic [ref=e83]:
        - generic [ref=e84]: Showing 3 results |
        - generic [ref=e85]: User can only see maximum 9 products on a page
      - generic [ref=e86]:
        - generic [ref=e90]:
          - heading "ADIDAS ORIGINAL" [level=5] [ref=e91]
          - generic [ref=e92]: $ 11500
          - button "View" [ref=e94] [cursor=pointer]:
            - generic [ref=e95]: 
            - text: View
          - button " Add To Cart" [ref=e96] [cursor=pointer]:
            - generic [ref=e97]: 
            - text: Add To Cart
        - generic [ref=e101]:
          - heading "ZARA COAT 3" [level=5] [ref=e102]
          - generic [ref=e103]: $ 11500
          - button "View" [ref=e105] [cursor=pointer]:
            - generic [ref=e106]: 
            - text: View
          - button " Add To Cart" [ref=e107] [cursor=pointer]:
            - generic [ref=e108]: 
            - text: Add To Cart
        - generic [ref=e112]:
          - heading "iphone 13 pro" [level=5] [ref=e113]
          - generic [ref=e114]: $ 55000
          - button "View" [ref=e116] [cursor=pointer]:
            - generic [ref=e117]: 
            - text: View
          - button " Add To Cart" [ref=e118] [cursor=pointer]:
            - generic [ref=e119]: 
            - text: Add To Cart
    - list "Pagination" [ref=e124]:
      - listitem [ref=e125]:
        - text: «
        - generic [ref=e126]:
          - text: Previous
          - generic [ref=e127]: page
      - listitem [ref=e128]:
        - generic [ref=e129]: You're on page
        - text: "1"
      - listitem [ref=e130]:
        - generic [ref=e131]:
          - text: Next
          - generic [ref=e132]: page
        - text: »
  - generic [ref=e133]: Design and Developed By - Kunal Sharma
```

# Test source

```ts
  1   | const {test, expect} = require('@playwright/test');
  2   | 
  3   | let webContext;
  4   | 
  5   | // here borwser is a fixture
  6   | test.beforeAll(async ({browser}) =>
  7   | {
  8   |     const context = await browser.newContext();
  9   |     const page = await context.newPage();
  10  | 
  11  |     await page.goto("https://rahulshettyacademy.com/client");
  12  |     await page.locator("#userEmail").fill("kunikajain27@gmail.com");
  13  |     await page.locator("[type='password']").fill("Kunikajain@02");
  14  |     await page.locator("#login").click();
  15  |     await page.waitForLoadState('networkidle');
  16  | 
  17  |     // the storage will save from browser level, 
  18  |     // the storage will save in the json file and when running the script this will create the state.json file automatically.
  19  |     await context.storageState({path: 'state.json'});
  20  |     webContext = await browser.newContext({storageState:'state.json'});
  21  | })
  22  | 
  23  | 
  24  | // Practice test
  25  | test('@Web Practice Playwright Test', async ()=>
  26  | {
  27  |     const page = await webContext.newPage();
  28  |     
  29  |     await page.goto("https://rahulshettyacademy.com/client");
  30  |     console.log(await page.title());
  31  |     const products = page.locator(".card-body");
  32  |     const productName = "ZARA COAT 3"
  33  |     const email = "kunikajain27@gmail.com"
  34  | 
> 35  |     await page.locator(".card-body b").first().waitFor();
      |                                                ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  36  |     console.log(await page.locator(".card-body b").allTextContents());
  37  | 
  38  |     const count = await products.count();
  39  |     for(let i=0; i<count; ++i)
  40  |     {
  41  |         // Here we use .locator() to search the title of the product, here the locator will only search the child of class = card-body, not from the whole DOM
  42  |         // this is called dynamically searching
  43  |         if (await products.nth(i).locator("b").textContent() === productName)
  44  |         {
  45  |             // add to cart logic
  46  |             // console.log(await products.nth(i).locator("b").textContent());
  47  |             await products.nth(i).locator("text= Add To Cart").click();
  48  |             break;
  49  |         }
  50  |     }
  51  | 
  52  |     await page.locator("[routerlink= '/dashboard/cart']").click();
  53  |     await page.locator("div li").first().waitFor();
  54  | 
  55  |     // search from the cart 
  56  |     // this is the another method to find the text name, here write tagname:has-text('') this is sudo-class method
  57  |     // .isVisible() checks if the method is visible or not on the page, it returs boolean value, it does not have auto-wait
  58  |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  59  |     expect(bool).toBeTruthy();
  60  |     // we cannot use text all the time, it should be unique
  61  |     await page.locator("text=Checkout").click();
  62  |     await page.locator("input[type='text']").nth(1).fill("123");
  63  |     await page.locator("input[type='text']").nth(2).fill("kunika jain");
  64  |     await page.locator("input[type='text']").nth(3).fill("rahulshettyacademy");
  65  |     await page.locator("div button").click();   
  66  |     await page.locator("text=* Coupon Applied").waitFor();
  67  |     // .pressSequentially() enter words one by one  
  68  |     await page.locator("[placeholder*='Country']").pressSequentially('ind', {delay: 100});
  69  | 
  70  |     // because we want to search in that section only
  71  |     const dropdown = await page.locator(".ta-results").first();
  72  |     await dropdown.waitFor();
  73  |     const optionsCounts = await dropdown.locator("button").count();
  74  |     // console.log(optionsCounts);
  75  |     for (let i = 0; i < optionsCounts; ++i)
  76  |     {
  77  |         const text = await dropdown.locator("button").nth(i).textContent();
  78  |         // console.log(text);
  79  |         if(text === " India") // to get rid of space before india use text.trim() === "India" or text.includes("India")
  80  |         {
  81  |             await dropdown.locator("button").nth(i).click();
  82  |             break;
  83  |         }
  84  |     }
  85  | 
  86  |     await expect(page.locator(".user__name label")).toHaveText(email);
  87  | 
  88  |     await page.locator(".action__submit").click();
  89  | 
  90  |     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  91  |     const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  92  |     console.log(orderID);
  93  | 
  94  |     await page.locator("label[routerlink='/dashboard/myorders']").click();
  95  | 
  96  |     await page.locator("tbody").waitFor();
  97  |     const column = await page.locator("tbody tr");
  98  |     // console.log(row);
  99  |     
  100 |     for (let i = 0; i<await column.count(); ++i)
  101 |     {   
  102 |         const rowOrderid = await column.locator("th").nth(i).textContent();
  103 |         if(orderID.includes(rowOrderid))
  104 |         {
  105 |             await column.locator("button").first().click();
  106 |             break;
  107 |         }
  108 |     }
  109 | 
  110 |     const orderDetailsID = await page.locator(".col-text").first().textContent();
  111 |     expect(orderID.includes(orderDetailsID)).toBeTruthy();
  112 | 
  113 |     await page.pause();
  114 | 
  115 | 
  116 | });
  117 | 
  118 | test('title printing', async ()=>
  119 | {
  120 |     const page = await webContext.newPage();
  121 |     
  122 |     await page.goto("https://rahulshettyacademy.com/client");
  123 |     console.log(await page.title());
  124 | })
```