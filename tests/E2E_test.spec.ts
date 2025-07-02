import { test, expect, Locator } from '@playwright/test';
import { PageManager } from '../support/PageObject/pageManager.PO';
import { checkVisibility } from '../support/PageObject/pageManager.PO';
import { env, cred } from '../support/data'
import ApiRequests from '../support/APIRequests';

const { baseUserURL } = env;
const { validFirstName, validLastName, validEmail, validPhone, invalidFirstName, invalidLastName, invalidEmail, invalidPhone } = cred;

test.describe("E2E test for test_task", () => {

    let pm: PageManager;



    test("Valid data input", async ({ page, request }) => {
        //const api = new ApiRequests(request);
        //await api.deleteBookingsInDateRange("2025-07-13", "2025-07-15");
        pm = new PageManager(page);

        await page.goto(baseUserURL);

        await expect(page).toHaveURL('https://automationintesting.online/');

        await checkVisibility([
            pm.dashboard().getWelcomeTitle(),
            pm.dashboard().getTitleDescription(),
            pm.dashboard().getBookNowButton(),
            pm.dashboard().getCheckAvailabilityBox(),
            pm.dashboard().getCheckAvailabilityBoxTitle(),
            pm.dashboard().getOurRoomTitle(),
            pm.dashboard().getOutRoomDescription()
        ]);

        const roomBoxes = pm.dashboard().getRoomBox();

        await roomBoxes.first().waitFor({ state: 'visible' })

        await expect(roomBoxes).toHaveCount(3);

        const count = await roomBoxes.count();

        for (let i = 0; i < count; i++) {
            const box = roomBoxes.nth(i);

            await expect(box).toBeVisible();
        };

        await checkVisibility([
            pm.dashboard().getFirstRoomImage(),
            pm.dashboard().getFirstRoomTitle(),
            pm.dashboard().getFirstRoomDescription(),
            pm.dashboard().getFirstRoomFunctionBadges(),
            pm.dashboard().getFirstRoomPricePerNight(),
            pm.dashboard().getFirstRoomBookNowButton()
        ]);

        await pm.dashboard().getFirstRoomBookNowButton().click();

        await page.waitForLoadState();

        await checkVisibility([
            pm.room().getSingleRoomTitle(),
            pm.room().getAccessibleBadge(),
            pm.room().getCountOfGuests(),
            pm.room().getRoomImage(),
            pm.room().getRoomDescriptionTitle(),
            pm.room().getRoomDescription(),
            pm.room().getRoomFeaturesTitle(),
            pm.room().getRoomFeatures(),
            pm.room().getRoomPoliciesTitle(),
            pm.room().getRoomPolicies(),
            pm.room().getBookThisRoomTitle(),
            pm.room().getRoomPrice(),
            pm.room().getMonthButton(),
            pm.room().getDateCalendar(),
            pm.room().getPriceSummary(),
            pm.room().getReserveNowButton(),
        ]);

        const dayButtons = pm.room().getDay().locator('button');

        const getCenter = async (button: Locator) => {
            const box = await button.boundingBox();
            if (!box) throw new Error('No bounding box');
            return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
        };

        const start = dayButtons.filter({ hasText: '13' }).first();
        const end = dayButtons.filter({ hasText: '15' }).first();

        const startPos = await getCenter(start);
        const endPos = await getCenter(end);

        await page.mouse.move(startPos.x, startPos.y);
        await page.mouse.down();
        await page.mouse.move(endPos.x, endPos.y, { steps: 10 });
        await page.mouse.up();


        await pm.room().getReserveNowButton().click();

        await page.waitForLoadState();

        await checkVisibility([
            pm.room().getFirstNameInput(),
            pm.room().getLastNameInput(),
            pm.room().getEmailInput(),
            pm.room().getPhoneInput(),
            pm.room().getCancelButton()
        ]);

        await pm.room().getFirstNameInput().fill(validFirstName);

        await pm.room().getLastNameInput().fill(validLastName);

        await pm.room().getEmailInput().fill(validEmail);

        await pm.room().getPhoneInput().fill(validPhone);

        const [requests] = await Promise.all([
            page.waitForRequest('**/api/booking'),
            pm.room().getReserveNowButton().click()
        ]);

        const payload = requests.postDataJSON();
        console.log('📦 Booking payload:', payload);

        expect(payload.firstname).toBe(validFirstName);
        expect(payload.lastname).toBe(validLastName);
        expect(payload.email).toBe(validEmail);
        expect(payload.phone).toBe(validPhone);

        await expect(pm.room().getBookingConfirmedBox()).toBeVisible();

        await expect(pm.room().getReturnHomeButton()).toBeVisible();

        await pm.room().getReturnHomeButton().click();

        await page.waitForLoadState();

        await expect(page).toHaveURL(baseUserURL);

    });

    test("Invalid data input", async ({ page }) => {
        pm = new PageManager(page);

        await page.goto(baseUserURL);

        await expect(page).toHaveURL('https://automationintesting.online/');

        await checkVisibility([
            pm.dashboard().getWelcomeTitle(),
            pm.dashboard().getTitleDescription(),
            pm.dashboard().getBookNowButton(),
            pm.dashboard().getCheckAvailabilityBox(),
            pm.dashboard().getCheckAvailabilityBoxTitle(),
            pm.dashboard().getOurRoomTitle(),
            pm.dashboard().getOutRoomDescription()
        ]);

        const roomBoxes = pm.dashboard().getRoomBox();

        await roomBoxes.first().waitFor({ state: 'visible' })

        await expect(roomBoxes).toHaveCount(3);

        const count = await roomBoxes.count();

        for (let i = 0; i < count; i++) {
            const box = roomBoxes.nth(i);

            await expect(box).toBeVisible();
        };

        await checkVisibility([
            pm.dashboard().getFirstRoomImage(),
            pm.dashboard().getFirstRoomTitle(),
            pm.dashboard().getFirstRoomDescription(),
            pm.dashboard().getFirstRoomFunctionBadges(),
            pm.dashboard().getFirstRoomPricePerNight(),
            pm.dashboard().getFirstRoomBookNowButton()
        ]);

        await pm.dashboard().getFirstRoomBookNowButton().click();

        await page.waitForLoadState();

        await checkVisibility([
            pm.room().getSingleRoomTitle(),
            pm.room().getAccessibleBadge(),
            pm.room().getCountOfGuests(),
            pm.room().getRoomImage(),
            pm.room().getRoomDescriptionTitle(),
            pm.room().getRoomDescription(),
            pm.room().getRoomFeaturesTitle(),
            pm.room().getRoomFeatures(),
            pm.room().getRoomPoliciesTitle(),
            pm.room().getRoomPolicies(),
            pm.room().getBookThisRoomTitle(),
            pm.room().getRoomPrice(),
            pm.room().getMonthButton(),
            pm.room().getDateCalendar(),
            pm.room().getPriceSummary(),
            pm.room().getReserveNowButton(),
        ]);

        const dayButtons = pm.room().getDay().locator('button');

        const countDays = await dayButtons.count();
        for (let i = 0; i < countDays; i++) {
            const button = dayButtons.nth(i);
            const text = await button.textContent();

            if (['13', '14', '15'].includes(text?.trim() || '')) {
                await button.click();
            }
        };

        await pm.room().getReserveNowButton().click();

        await page.waitForLoadState();

        await checkVisibility([
            pm.room().getFirstNameInput(),
            pm.room().getLastNameInput(),
            pm.room().getEmailInput(),
            pm.room().getPhoneInput(),
            pm.room().getCancelButton()
        ]);

        await pm.room().getReserveNowButton().click();

        const errorsBox = pm.room().getErrorsBox();
        await expect(errorsBox).toBeVisible();
        await expect(errorsBox.locator('li')).toHaveCount(7);
        await page.route('**/api/booking', async route => {
            await route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Invalid input data',
                })
            });
        });

        await pm.room().getFirstNameInput().fill(invalidFirstName);

        await pm.room().getLastNameInput().fill(invalidLastName);

        await pm.room().getEmailInput().fill(invalidEmail);

        await pm.room().getPhoneInput().fill(invalidPhone);

        await pm.room().getReserveNowButton().click();

        const errorsBoxs = pm.room().getErrorsBox();
        await expect(errorsBoxs).toBeVisible();
        await expect(errorsBoxs.locator('li')).toHaveCount(4);

    });

    test("Check selected data", async ({ page }) => {
        pm = new PageManager(page);

        await page.goto(baseUserURL);

        await expect(page).toHaveURL('https://automationintesting.online/');

        await checkVisibility([
            pm.dashboard().getFirstRoomImage(),
            pm.dashboard().getFirstRoomTitle(),
            pm.dashboard().getFirstRoomDescription(),
            pm.dashboard().getFirstRoomFunctionBadges(),
            pm.dashboard().getFirstRoomPricePerNight(),
            pm.dashboard().getFirstRoomBookNowButton()
        ]);

        await pm.dashboard().getFirstRoomBookNowButton().click();

        await page.waitForLoadState();

        await checkVisibility([
            pm.room().getSingleRoomTitle(),
            pm.room().getAccessibleBadge(),
            pm.room().getCountOfGuests(),
            pm.room().getRoomImage(),
            pm.room().getRoomDescriptionTitle(),
            pm.room().getRoomDescription(),
            pm.room().getRoomFeaturesTitle(),
            pm.room().getRoomFeatures(),
            pm.room().getRoomPoliciesTitle(),
            pm.room().getRoomPolicies(),
            pm.room().getBookThisRoomTitle(),
            pm.room().getRoomPrice(),
            pm.room().getMonthButton(),
            pm.room().getDateCalendar(),
            pm.room().getPriceSummary(),
            pm.room().getReserveNowButton(),
        ]);

        const unavailableItem = pm.room().getUnavailableTitle();

        await expect(unavailableItem).toHaveCount(1);

        await expect(unavailableItem).toBeVisible();

        await expect(unavailableItem).toHaveAttribute('title', 'Unavailable');

    });
})