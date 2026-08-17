// file name and class name should be same
class APIUtils
{
    constructor(apiContext, loginPayLoad)
    {
        // 'this' is for calling local variables inside class
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken()
    {

        // here we are storing the response and status 
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: this.loginPayLoad
            })

        // here we need to have the response in json
        const loginResponseJson = await loginResponse.json(); 

        // here we are storing token from the response 
        // here we don't need await because we are just parsing it
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken();
        // api of ordering product
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
                data: orderPayLoad,
                headers:{
                            'Authorization' : response.token,
                            'Content-Type' : 'application/json'
                        },
            })
        
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderID = orderResponseJson.orders[0];

        response.orderID = orderID;
        return response;
    }
}

module.exports = {APIUtils};