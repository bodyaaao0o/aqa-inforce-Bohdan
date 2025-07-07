import { Page, expect } from "@playwright/test";
import { DashboardPage } from "./dashboardPage.PO";
import { RoomPage } from "./roomPage.PO";

export class PageManager {
    private readonly page: Page;
    private readonly dashboardPage: DashboardPage;
    private readonly roomPage: RoomPage;

    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(this.page);
        this.roomPage = new RoomPage(this.page);
    };

    dashboard() {
        return this.dashboardPage;
    };

    room() {
        return this.roomPage;
    };

    async goToFirstRoom() {
        await this.dashboard().clickFirstRoomBookNowButton();
        await this.page.waitForLoadState();
    }
}
