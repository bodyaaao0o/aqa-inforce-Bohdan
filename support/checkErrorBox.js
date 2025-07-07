import { expect } from '@playwright/test';

export const expectFormValidationErrors = async (page, locator, expectedCount) => {
    await expect(locator).toBeVisible();
    await expect(locator.locator('li')).toHaveCount(expectedCount);
};
