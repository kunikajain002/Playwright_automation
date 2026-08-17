import {test as baseTest} from '@playwright/test';
interface testDataForOrder
{
    productName: string;
    email: string;
    password: string;
}

export const customTest = baseTest.extend<{testDataForOrder: testDataForOrder}>(
// exports.test = base.test.extend(
    {
        testDataForOrder:
        {
            productName: "ZARA COAT 3",
            email: "kunikajain27@gmail.com",
            password: "Kunikajain@02"
        }
    }
)