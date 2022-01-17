module.exports = class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  open(path) {
    return browser.url(`${path}`);
  }

  async clickElement(selector) {
    await selector.scrollIntoView({ block: "center" });
    await browser.waitUntil(() => selector.isClickable());
    await selector.click();
  }

  async inputValue(selector, value) {
    await this.clickElement(selector);
    await browser.keys(value);
  }

  waitForPageLoad(timeout = 60000) {
    browser.waitUntil(
      () => browser.execute(() => document.readyState === "complete"),
      { timeout: timeout, timeoutMsg: "Page never fully loaded" }
    );
  }
};
