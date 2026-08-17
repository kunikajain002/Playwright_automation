class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.signInbutton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("[type='password']");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    // data should come from the test
    async validLogin(email, password)
    {
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
    
}

module.exports = {LoginPage};