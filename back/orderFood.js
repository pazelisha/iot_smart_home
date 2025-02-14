const puppeteer = require("puppeteer"); // v23.0.0 or later

async function orderFood() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1700,
      height: 953,
    });
  }
  {
    const targetPage = page;
    await targetPage.goto(
      "https://anipet.co.il/category/184/%D7%90%D7%95%D7%9B%D7%9C-%D7%9C%D7%9B%D7%9C%D7%91%D7%99%D7%9D---%D7%9E%D7%96%D7%95%D7%9F-%D7%99%D7%91%D7%A9"
    );
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator(
        "div.product-thumb-grid-wrapper > div:nth-of-type(4) > div > div > div > a"
      ),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"mainApp\\"]/div[3]/div/div[1]/div[2]/div[4]/div[4]/div/div/div/a)'
      ),
      targetPage.locator(
        ":scope >>> div.product-thumb-grid-wrapper > div:nth-of-type(4) > div > div > div > a"
      ),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 94.828125,
          y: 8.75,
        },
      });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("div.pb-3 span:nth-of-type(2)"),
      targetPage.locator('::-p-xpath(//*[@id=\\"basket-btn\\"]/span[2])'),
      targetPage.locator(":scope >>> div.pb-3 span:nth-of-type(2)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 88.515625,
          y: 22.765625,
        },
      });
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(המשך לקופה)"),
      targetPage.locator("div.offcanvas-footer > div > a"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"basketFlyout\\"]/div[3]/div/a)'
      ),
      targetPage.locator(":scope >>> div.offcanvas-footer > div > a"),
      targetPage.locator("::-p-text(המשך לקופה)"),
    ])
      .setTimeout(timeout)
      .on("action", () => startWaitingForEvents())
      .click({
        offset: {
          x: 152,
          y: 31,
        },
      });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(שם פרטי)"),
      targetPage.locator("#FirstName"),
      targetPage.locator('::-p-xpath(//*[@id=\\"FirstName\\"])'),
      targetPage.locator(":scope >>> #FirstName"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 108.5,
          y: 13,
        },
      });
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Alt");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Shift");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Alt");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Shift");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(שם פרטי)"),
      targetPage.locator("#FirstName"),
      targetPage.locator('::-p-xpath(//*[@id=\\"FirstName\\"])'),
      targetPage.locator(":scope >>> #FirstName"),
    ])
      .setTimeout(timeout)
      .fill("פז");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Tab");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Tab");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(שם משפחה)"),
      targetPage.locator("#LastName"),
      targetPage.locator('::-p-xpath(//*[@id=\\"LastName\\"])'),
      targetPage.locator(":scope >>> #LastName"),
    ])
      .setTimeout(timeout)
      .fill("אלישע");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Tab");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Tab");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Alt");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Shift");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Alt");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Control");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Shift");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(דואר אלקטרוני)"),
      targetPage.locator("#Email"),
      targetPage.locator('::-p-xpath(//*[@id=\\"Email\\"])'),
      targetPage.locator(":scope >>> #Email"),
    ])
      .setTimeout(timeout)
      .fill("paz.elisha@");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("2");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(דואר אלקטרוני)"),
      targetPage.locator("#Email"),
      targetPage.locator('::-p-xpath(//*[@id=\\"Email\\"])'),
      targetPage.locator(":scope >>> #Email"),
    ])
      .setTimeout(timeout)
      .fill("paz.elisha@gmail.com");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(המשך לפרטי משלוח)"),
      targetPage.locator("#checkout-customer button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"checkout-customer\\"]/div[2]/div/div[5]/button)'
      ),
      targetPage.locator(":scope >>> #checkout-customer button"),
      targetPage.locator("::-p-text(המשך לפרטי משלוח)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 159.390625,
          y: 27,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator(
        "#shipping-address > div.section-body > div > div:nth-of-type(1)"
      ),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"shipping-address\\"]/div[2]/div/div[1])'
      ),
      targetPage.locator(
        ":scope >>> #shipping-address > div.section-body > div > div:nth-of-type(1)"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 134.5,
          y: 24,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(עיר)"),
      targetPage.locator("#City"),
      targetPage.locator('::-p-xpath(//*[@id=\\"City\\"])'),
      targetPage.locator(":scope >>> #City"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 100.5,
          y: 12,
        },
      });
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Alt");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Shift");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Alt");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Shift");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(עיר)"),
      targetPage.locator("#City"),
      targetPage.locator('::-p-xpath(//*[@id=\\"City\\"])'),
      targetPage.locator(":scope >>> #City"),
    ])
      .setTimeout(timeout)
      .fill("רחובות");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("Tab");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Tab");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(כתובת)"),
      targetPage.locator("#Address1"),
      targetPage.locator('::-p-xpath(//*[@id=\\"Address1\\"])'),
      targetPage.locator(":scope >>> #Address1"),
    ])
      .setTimeout(timeout)
      .fill("החבורה");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(רחובות)"),
      targetPage.locator("div.section-body > div > div:nth-of-type(1) li"),
      targetPage.locator('::-p-xpath(//*[@id=\\"autoComplete_result_0\\"])'),
      targetPage.locator(
        ":scope >>> div.section-body > div > div:nth-of-type(1) li"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 313.703125,
          y: 16.015625,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(מס\\' בית)"),
      targetPage.locator("#HouseNumber"),
      targetPage.locator('::-p-xpath(//*[@id=\\"HouseNumber\\"])'),
      targetPage.locator(":scope >>> #HouseNumber"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 55.484375,
          y: 11,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(מס\\' בית)"),
      targetPage.locator("#HouseNumber"),
      targetPage.locator('::-p-xpath(//*[@id=\\"HouseNumber\\"])'),
      targetPage.locator(":scope >>> #HouseNumber"),
    ])
      .setTimeout(timeout)
      .fill("22");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(מס\\' דירה)"),
      targetPage.locator("#ApartmentNumber"),
      targetPage.locator('::-p-xpath(//*[@id=\\"ApartmentNumber\\"])'),
      targetPage.locator(":scope >>> #ApartmentNumber"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 102.46875,
          y: 22,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(מס\\' דירה)"),
      targetPage.locator("#ApartmentNumber"),
      targetPage.locator('::-p-xpath(//*[@id=\\"ApartmentNumber\\"])'),
      targetPage.locator(":scope >>> #ApartmentNumber"),
    ])
      .setTimeout(timeout)
      .fill("1");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(טלפון)"),
      targetPage.locator("#Phone"),
      targetPage.locator('::-p-xpath(//*[@id=\\"Phone\\"])'),
      targetPage.locator(":scope >>> #Phone"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 379.5,
          y: 20,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(טלפון)"),
      targetPage.locator("#Phone"),
      targetPage.locator('::-p-xpath(//*[@id=\\"Phone\\"])'),
      targetPage.locator(":scope >>> #Phone"),
    ])
      .setTimeout(timeout)
      .fill("0523363177");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(המשך לשיטת משלוח)"),
      targetPage.locator("#shipping-address button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"shipping-address\\"]/div[2]/div/div[11]/button)'
      ),
      targetPage.locator(":scope >>> #shipping-address button"),
      targetPage.locator("::-p-text(המשך לשיטת משלוח)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 199.125,
          y: 11,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(משלוח - ₪30.00)"),
      targetPage.locator(
        "div.section-body > div > div:nth-of-type(1) > div > div:nth-of-type(2) input"
      ),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"shipping-method\\"]/div[2]/div/div[1]/div/div[2]/label/input)'
      ),
      targetPage.locator(
        ":scope >>> div.section-body > div > div:nth-of-type(1) > div > div:nth-of-type(2) input"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 6.5,
          y: 2,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(המשך לתשלום)"),
      targetPage.locator("#shipping-method button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"shipping-method\\"]/div[2]/div/div[2]/div/button)'
      ),
      targetPage.locator(":scope >>> #shipping-method button"),
      targetPage.locator("::-p-text(המשך לתשלום)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 181.6875,
          y: 20,
        },
      });
  }

  await browser.close();
}

module.exports = orderFood;
