const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
    console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async () => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

test('Click "Poppa stacken!" should remove the top element', async () => {
    let topElementBefore = await driver.findElement(By.id('top_of_stack')).getText(); // hämtar det översta elementet
    let pop = await driver.findElement(By.id('pop')); // hittar knappen för att poppa stacken
    await pop.click(); // klickar på knappen

    let alert = await driver.switchTo().alert(); // alerten dyker upp
    await alert.accept(); // accepterar alerten

    let stack = await driver.findElement(By.id('peek')); // hittar knappen för att kolla det översta elementet
    await stack.click(); // klickar på knappen

    let topElementAfter = await driver.findElement(By.id('top_of_stack')).getText(); // hämtar det översta elementet igen

    expect(topElementBefore).not.toEqual(topElementAfter); // kontrollerar att det översta elementet har ändrats
});