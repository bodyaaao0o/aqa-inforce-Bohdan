import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getFirstRoomBookNowButton(): Locator {
        return this.page.locator('.card-footer a.btn.btn-primary').first();
    };

    clickFirstRoomBookNowButton() {
        return this.getFirstRoomBookNowButton().click();
    };

}
