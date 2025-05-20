class EmailService {
  constructor() {
    this.collectedEmails = new Map();
  }

  async collectEmail(page, selector) {
    try {
      await page.click(selector);
      await page.waitForSelector('#email-form');
      const email = await page.$eval('#email-input', el => el.value);
      this.collectedEmails.set(page.url(), email);
      return email;
    } catch (error) {
      console.error('Email collection failed:', error);
      return null;
    }
  }

  getEmails() {
    return Array.from(this.collectedEmails.values());
  }
}

module.exports = new EmailService();