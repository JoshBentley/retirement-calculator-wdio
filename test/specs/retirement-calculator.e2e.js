const RetirementCalculatorPage = require("../pageobjects/retirement-calculator.page");

describe("Calculator Form", () => {
  beforeEach(async () => {
    await RetirementCalculatorPage.open();
    await RetirementCalculatorPage.waitForPageLoad();
  });

  it("should be able to submit form with all default required field filled in", async () => {
    await RetirementCalculatorPage.fillDefaultRequiredFields();
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonCalculate
    );
    await expect(RetirementCalculatorPage.resultsChart).toExist();
  });

  it("should be able to submit with all extra required fields", async () => {
    await RetirementCalculatorPage.fillDefaultRequiredFields();
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.radioButtonSocialSecurityYes
    );
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonCalculate
    );
    await expect(RetirementCalculatorPage.resultsChart).toExist();
  });

  it("should not be able to submit without any required fields", async () => {
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonCalculate
    );
    await expect(RetirementCalculatorPage.missingFieldsAlert).toExist();
  });

  it("should not be able to submit without some required fields", async () => {
    await RetirementCalculatorPage.fillDefaultRequiredFields();
    await RetirementCalculatorPage.inputCurrentAge.setValue("");
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonCalculate
    );
    await expect(RetirementCalculatorPage.missingFieldsAlert).toExist();
  });

  it("should be able to submit with all fields filled in", async () => {
    await RetirementCalculatorPage.fillAllFields();
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonCalculate
    );
    await expect(RetirementCalculatorPage.resultsChart).toExist();
  });

  it("additional fields should show if social security benefits is toggled to yes", async () => {
    await RetirementCalculatorPage.radioButtonSocialSecurityYes.scrollIntoView();
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusSingle
    ).not.toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusMarried
    ).not.toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.inputSocialSecurityOverride
    ).not.toBeDisplayedInViewport();
    RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.radioButtonSocialSecurityYes
    );
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusSingle
    ).toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusMarried
    ).toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.inputSocialSecurityOverride
    ).toBeDisplayedInViewport();
  });

  it("additional fields should not show if social security benefits is toggled to no", async () => {
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.radioButtonSocialSecurityYes
    );
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusSingle
    ).toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusMarried
    ).toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.inputSocialSecurityOverride
    ).toBeDisplayedInViewport();
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.radioButtonSocialSecurityNo
    );
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusSingle
    ).not.toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.radioButtonMaritalStatusMarried
    ).not.toBeDisplayedInViewport();
    await expect(
      RetirementCalculatorPage.inputSocialSecurityOverride
    ).not.toBeDisplayedInViewport();
  });

  it("should clear the form when the clear button is clicked", async () => {
    await RetirementCalculatorPage.fillAllFields();
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonClearForm
    );
    await expect(RetirementCalculatorPage.inputCurrentAge).toHaveValue("");
  });

  it("should be able to able to update default calculator values", async () => {
    await RetirementCalculatorPage.fillDefaultRequiredFields();
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonCalculate
    );
    await expect(RetirementCalculatorPage.resultMessage).toHaveTextContaining(
      "$240 a month"
    );
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonEditInfo
    );
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.linkAdjustDefaultValues
    );
    await RetirementCalculatorPage.inputValue(
      RetirementCalculatorPage.inputAdditionalIncome,
      "5"
    );
    await RetirementCalculatorPage.inputValue(
      RetirementCalculatorPage.inputRetirementDuration,
      "5"
    );
    await RetirementCalculatorPage.inputValue(
      RetirementCalculatorPage.inputRetirementAnnualIncome,
      "5"
    );
    await RetirementCalculatorPage.inputValue(
      RetirementCalculatorPage.inputPreRetirementRoi,
      "5"
    );
    await RetirementCalculatorPage.inputValue(
      RetirementCalculatorPage.inputPostRetirementRoi,
      "5"
    );
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonDefaultValuesSaveChanges
    );
    await RetirementCalculatorPage.clickElement(
      RetirementCalculatorPage.buttonCalculate
    );
    //Final calculation has changed due to changing default values
    await expect(RetirementCalculatorPage.resultMessage).toHaveTextContaining(
      "$167 a month"
    );
  });
});

describe("Bugs", () => {
  beforeEach(async () => {
    await RetirementCalculatorPage.open();
    await RetirementCalculatorPage.waitForPageLoad();
  });

  it("should allow decimals in the rate of increase input", async () => {
    await RetirementCalculatorPage.inputValue(
      RetirementCalculatorPage.inputRateOfIncrease,
      ".25"
    );
    await expect(RetirementCalculatorPage.inputRateOfIncrease).toHaveValue(
      ".25%"
    );
  });
});
