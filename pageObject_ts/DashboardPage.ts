import {Page, Locator} from "@playwright/test";

export class DashboardPage {

    products: Locator;
    productText : Locator;
    cart: Locator;

    constructor(page: Page) {
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink= '/dashboard/cart']");

        // we don't add chaining elements 
    }

    async searchProductAddCart(productName: string) {

        await this.productText.first().waitFor();
        const title = await this.productText.allTextContents();
        console.log(title);

        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {

            if (await this.products.nth(i).locator("b").textContent() === productName) {

                // we can also define the string element for "text= Add To Cart"
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }
}

