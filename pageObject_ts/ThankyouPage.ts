import { Expect, Page, Locator } from "@playwright/test";

export class ThankyouPage {

    expect : Expect;
    verifyPage: Locator;
    orderID: Locator;
    orderPage: Locator;
    table: Locator;
    row: Locator;
    orderDetailID : Locator;


    constructor(page: Page, expect: Expect) {
        this.expect = expect;
        this.verifyPage = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderPage = page.locator("label[routerlink='/dashboard/myorders']");
        this.table = page.locator("tbody");
        this.row = page.locator("tbody tr");
        this.orderDetailID = page.locator(".col-text");
    }

    async thankyouPage() {
        await this.expect(this.verifyPage).toHaveText(" Thankyou for the order. ");
        const orderID : any = await this.orderID.textContent();
        console.log(orderID);

        await this.orderPage.click();

        await this.table.waitFor();
        const column = await this.row;
        // console.log(row);

        for (let i = 0; i < await column.count(); ++i) {
            const rowOrderid = await column.locator("th").nth(i).textContent();
            if (orderID.includes(rowOrderid)) {
                await column.locator("button").first().click();
                break;
            }
        }

        const orderDetailsID = await this.orderDetailID.first().textContent();
        this.expect(orderID.includes(orderDetailsID)).toBeTruthy();
    }
}

