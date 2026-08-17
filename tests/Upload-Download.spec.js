const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function writeExcel(searchText, replaceText,change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)

    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
    console.log
}

async function readExcel(worksheet, searchText)
{
    let output = {row : -1, column : -1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // console.log(cell.value);

            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })

    return output;
}

// writeExcel("Mango",350,{rowChange: 0, colChange: 2}, "C:/Users/KunikaCB/Downloads/download.xlsx");

test("Upload Download excel validation", async ({page})=>
{
    const searchText = "Mango";
    const updatedValue = 350;
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", {name: "Download"}).click();

    
    // here it wait until the downloads complete
    // await downloadPromise;
    const download = await downloadPromise;
    await download.saveAs('C:/Users/KunikaCB/Downloads/download.xlsx');

    writeExcel(searchText,updatedValue,{rowChange: 0, colChange: 2}, "C:/Users/KunikaCB/Downloads/download.xlsx");


    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/KunikaCB/Downloads/download.xlsx");

    const textLocator = await page.getByText(searchText);
    const desiredRow = await page.getByRole('row').filter({has: textLocator}).locator("#cell-4-undefined");
    // await expect(desiredRow).toContainText(updatedValue.toString());
    await expect(desiredRow).toContainText(`${updatedValue}`);


})