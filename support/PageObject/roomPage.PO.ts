import { Locator, Page } from "@playwright/test";

export class RoomPage {
    private readonly page:Page;

    constructor(page: Page) {
        this.page = page;
    };

    getSingleRoomTitle(): Locator {
        return this.page.locator('h1', { hasText: "Single Room" });
    };

    getAccessibleBadge(): Locator {
        return this.page.locator('span.badge.bg-success', { hasText: "Accessible" });
    };

    getCountOfGuests(): Locator {
        return this.page.locator('.text-muted', {hasText: " Max 2 Guests"});
    };

    getRoomImage(): Locator {
        return this.page.locator('img[src="/images/room1.jpg"]');
    };

    getRoomDescriptionTitle(): Locator {
        return this.page.locator('h2', {hasText: 'Room Description'});
    };

    getRoomDescription(): Locator {
        return this.page.locator('p', {hasText: 'Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.'});
    };

    getRoomFeaturesTitle(): Locator {
        return this.page.locator('h2', {hasText: "Room Features"});
    };

    getRoomFeatures(): Locator {
        return this.page.locator('.row.g-3.d-flex.flex-wrap');
    };

    getRoomPoliciesTitle(): Locator {
        return this.page.locator('h2', {hasText: "Room Policies"});
    };

    getRoomPolicies(): Locator {
        return this.page.locator('.row.g-4', {hasText: 'Check-in & Check-out'});
    };

    getBookThisRoomTitle(): Locator {
        return this.page.locator('h2', {hasText: 'Book This Room'});
    };

    getRoomPrice(): Locator {
        return this.page.locator('.d-flex.align-items-baseline.mb-4');
    };

    getMonthButton(): Locator {
        return this.page.locator('.rbc-btn-group', {hasText: "Today"});
    };

    getDateCalendar(): Locator {
        return this.page.locator('.rbc-month-view[role="table"]');
    };

    getDay(): Locator {
        return this.page.locator('.rbc-date-cell');
    };

    getPriceSummary(): Locator {
        return this.page.locator('.card-body', {hasText: "Price Summary"}).nth(0);
    };

    getReserveNowButton(): Locator {
        return this.page.locator('button', {hasText: 'Reserve Now'});
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
        return this.page.locator('button', {hasText: "Cancel"});
    };

    getBookingConfirmedBox(): Locator {
        return this.page.locator('.card-body', {hasText: "Booking Confirmed"});
    };

    getReturnHomeButton(): Locator {
        return this.page.locator('a', {hasText: "Return home"});
    };

    getErrorsBox(): Locator {
        return this.page.locator('.alert.alert-danger');
    };

    getUnavailableTitle(): Locator {
        return this.page.locator('.rbc-event-content[title="Unavailable"]');
    };
}