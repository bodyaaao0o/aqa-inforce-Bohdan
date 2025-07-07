import { Locator, Page, expect } from "@playwright/test";

export class RoomPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    getReserveNowButton(): Locator {
        return this.page.locator('button', { hasText: 'Reserve Now' });
    };

    clickReserveNowButton() {
        return this.getReserveNowButton().click();
    };

    getFirstNameInput(): Locator {
        return this.page.locator('input[placeholder="Firstname"]');
    };

    getLastNameInput(): Locator {
        return this.page.locator('input[placeholder="Lastname"]');
    };

    getEmailInput(): Locator {
        return this.page.locator('input[placeholder="Email"]');
    };

    getPhoneInput(): Locator {
        return this.page.locator('input[placeholder="Phone"]');
    };

    getCancelButton(): Locator {
        return this.page.locator('button', { hasText: "Cancel" });
    };

    getBookingConfirmedBox(): Locator {
        return this.page.locator('.card-body', { hasText: "Booking Confirmed" });
    };

    getReturnHomeButton(): Locator {
        return this.page.locator('a', { hasText: "Return home" });
    };

    clickReturnHomeButton() {
        return this.getReturnHomeButton().click();
    };

    getErrorsBox(): Locator {
        return this.page.locator('.alert.alert-danger');
    };

    getUnavailableTitle(): Locator {
        return this.page.locator('.rbc-event-content[title="Unavailable"]');
    };
}