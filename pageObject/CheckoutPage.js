class CheckoutPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.listElement = page.locator("div li");
        this.checkoutButton = page.locator("text=Checkout");
        this.countryname = page.locator("[placeholder*='Country']");
        this.dropDown = page.locator(".ta-results");
        this.emailCheck = page.locator(".user__name label");
        this.placeOrder = page.locator(".action__submit");

    }

    async checkOut(email, productName) {

        await this.listElement.first().waitFor();

        this.expect(await this.getProductLocator(productName).isVisible()).toBeTruthy();
        await this.checkoutButton.click();

        await this.countryname.pressSequentially('ind', { delay: 100 });

        const dropdown = await this.dropDown.first();
        await dropdown.waitFor();
        const optionsCounts = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCounts; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            
            if (text === " India") 
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await this.expect(this.emailCheck).toHaveText(email);

        await this.placeOrder.click();
    }

    getProductLocator(productName)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}

module.exports = {CheckoutPage};