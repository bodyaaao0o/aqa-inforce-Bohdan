import { test, expect} from '@playwright/test';
import { PageManager } from '../support/PageObject/pageManager.PO';
import { env, cred } from '../support/data'
import ApiRequests from '../support/APIRequests';
import { fillInvalidBookingData, fillValidBookingData, verifyBookingRequestPayload, clickAndWaitForRequest } from '../support/input_data';
import { selectDateRange } from '../support/selectBookingData';
import { expectFormValidationErrors } from '../support/checkErrorBox';
import { verifyRoomBoxesVisible } from '../support/checkPageCount';

const { baseUserURL } = env;

test.describe("E2E test for test_task", () => {
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
    
        pm = new PageManager(page);
    
        await page.goto(baseUserURL);
    })

    test("Valid data input", async ({ page, request }) => {
        const api = new ApiRequests(request);

        await api.deleteBookingsForRoom("101", "2025-07-13", "2025-07-16");

        const roomBoxes = page.locator('.col-md-6.col-lg-4');

        await verifyRoomBoxesVisible(roomBoxes, 3);

        await pm.goToFirstRoom();

        const dayButtons = page.locator('.rbc-date-cell').locator('button');

        await selectDateRange(page, dayButtons, '13', '15');

        await pm.room().clickReserveNowButton();

        await page.waitForLoadState();

        await fillValidBookingData(pm, cred);

        const bookingRequest = await clickAndWaitForRequest(
            page,
            '**/api/booking',
            () => pm.room().clickReserveNowButton()
        );

        verifyBookingRequestPayload(bookingRequest, cred);

        await pm.room().clickReturnHomeButton();

        await page.waitForLoadState();

        await expect(page).toHaveURL(baseUserURL);

    });

    test("Invalid data input", async ({ page }) => {

        await pm.goToFirstRoom();

        const dayButtons = page.locator('.rbc-date-cell').locator('button');

        await selectDateRange(page, dayButtons, '13', '15');

        await pm.room().clickReserveNowButton();

        await page.waitForLoadState();

        await pm.room().clickReserveNowButton();

        await expectFormValidationErrors(page, pm.room().getErrorsBox(), 7);

        await fillInvalidBookingData(pm, cred);

        const errorsBoxs = page.locator('.alert.alert-danger');

        await expect(errorsBoxs).toBeVisible();

        await expect(errorsBoxs.locator('li')).toHaveCount(4);

    });

    test("Should show unavailable label for already booked dates", async ({ page }) => {

        await pm.goToFirstRoom();

        const unavailableItem = page.locator('.rbc-row-segment[style*="42.8571%"] .rbc-event-content[title="Unavailable"]');

        await expect(unavailableItem).toBeVisible();

        await expect(unavailableItem).toHaveAttribute('title', 'Unavailable');
    });
});