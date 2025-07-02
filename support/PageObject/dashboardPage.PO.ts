import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getWelcomeTitle(): Locator {
        return this.page.locator('h1.display-4.fw-bold.mb-4', { hasText: "Welcome to Shady Meadows B&B" });
    };

    getTitleDescription(): Locator {
        return this.page.locator('p.lead.mb-4', { hasText: "Welcome to Shady Meadows" });
    };

    getBookNowButton(): Locator {
        return this.page.locator('[href="#booking"]', { hasText: "Book Now" });
    };

    getCheckAvailabilityBox(): Locator {
        return this.page.locator('.card.shadow.booking-card');
    };

    getCheckAvailabilityBoxTitle(): Locator {
        return this.page.locator('h3', { hasText: "Check Availability & Book Your Stay" });
    };

    getOurRoomTitle(): Locator {
        return this.page.locator('h2', { hasText: "Our Room" });
    };

    getOutRoomDescription(): Locator {
        return this.page.locator('p', { hasText: 'Comfortable beds and delightful breakfast from locally sourced ingredients' });
    };

    getRoomBox(): Locator {
        return this.page.locator('.col-md-6.col-lg-4');
    };

    getFirstRoomImage(): Locator {
        return this.page.locator('img[src="/images/room1.jpg"]');
    };

    getFirstRoomTitle(): Locator {
        return this.page.locator('h5', { hasText: "Single" });
    };

    getFirstRoomDescription(): Locator {
        return this.page.locator('p', { hasText: 'Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.' });
    };

    getFirstRoomFunctionBadges(): Locator {
        return this.page.locator('.d-flex.gap-3.mb-3.flex-wrap').first();
    };

    getFirstRoomPricePerNight(): Locator {
        return this.page.locator('.fw-bold.fs-5', { hasText: "100 per night" });
    };

    getFirstRoomBookNowButton(): Locator {
        return this.page.locator('a[href="/reservation/1?checkin=2025-07-02&checkout=2025-07-03"]').first();
    }
}