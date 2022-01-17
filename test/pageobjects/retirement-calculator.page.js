const Page = require("./page");

class RetirementCalculatorPage extends Page {
  url = "/insights-tools/retirement-calculator.html";

  get missingFieldsAlert() {
    return $("#calculator-input-alert-desc");
  }

  get inputCurrentAge() {
    return $("#current-age");
  }

  get inputRetirementAge() {
    return $("#retirement-age");
  }

  get inputCurrentIncome() {
    return $("#current-income");
  }

  get inputSpouseIncome() {
    return $("#spouse-income");
  }

  get inputSavingsBalance() {
    return $("input[id='current-total-savings']");
  }

  get inputAnnualSavings() {
    return $("#current-annual-savings");
  }

  get inputRateOfIncrease() {
    return $("#savings-increase-rate");
  }

  get radioButtonSocialSecurityYes() {
    return $('label[for="yes-social-benefits"]');
  }

  get radioButtonSocialSecurityNo() {
    return $('label[for="no-social-benefits"]');
  }

  get radioButtonMaritalStatusSingle() {
    return $('label[for="single"]');
  }

  get radioButtonMaritalStatusMarried() {
    return $('label[for="married"]');
  }

  get inputSocialSecurityOverride() {
    return $("#social-security-override");
  }

  get linkAdjustDefaultValues() {
    return $('a[data-target="#default-values-modal"]');
  }

  get buttonCalculate() {
    return $('button[data-tag-id="submit"]');
  }

  get buttonClearForm() {
    return $('button[onclick="clearRetirementForm();"]');
  }

  // Default calculator values module

  get inputAdditionalIncome() {
    return $("#additional-income");
  }

  get inputRetirementDuration() {
    return $("#retirement-duration");
  }

  get radioButtonInflationIncreaseYes() {
    return $("#include-inflation");
  }

  get radioButtonInflationIncreaseNo() {
    return $("#exclude-inflation");
  }

  get inputExpectedInflationRate() {
    return $("#expected-inflation-rate");
  }

  get inputRetirementAnnualIncome() {
    return $("#retirement-annual-income");
  }

  get inputPreRetirementRoi() {
    return $("#pre-retirement-roi");
  }

  get inputPostRetirementRoi() {
    return $("#post-retirement-roi");
  }

  get buttonDefaultValuesSaveChanges() {
    return $('input[value="Save changes"]');
  }

  get buttonDefaultValuesCancel() {
    return $('button[onclick="clearDefaultValuesForm();"]');
  }

  // Results

  get resultMessage() {
    return $("#result-message");
  }

  get resultsChart() {
    return $("#results-chart");
  }

  get loadingSpinner() {
    return $("#calcSpinnerOnly-text");
  }

  get buttonEditInfo() {
    return $("button=Edit info");
  }

  async open() {
    return super.open(this.url);
  }

  async waitForPageLoad() {
    return super.waitForPageLoad();
  }

  async inputValue(selector, value) {
    return super.inputValue(selector, value);
  }

  async clickElement(selector) {
    return super.clickElement(selector);
  }

  async fillDefaultRequiredFields() {
    await this.inputValue(this.inputCurrentAge, "40");
    await this.inputValue(this.inputRetirementAge, "68");
    await this.inputValue(this.inputCurrentIncome, "20000");
    await this.inputValue(this.inputSavingsBalance, "10000");
    await this.inputValue(this.inputAnnualSavings, "10");
    await this.inputValue(this.inputRateOfIncrease, "1");
  }

  async fillAllFields() {
    await this.fillDefaultRequiredFields();
    await this.inputValue(this.inputSpouseIncome, "75000");
    await this.radioButtonSocialSecurityYes.click();
    await this.inputValue(this.inputSocialSecurityOverride, "4000");
  }
}

module.exports = new RetirementCalculatorPage();
