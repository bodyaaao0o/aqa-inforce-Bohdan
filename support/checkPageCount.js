import { expect } from '@playwright/test';

export const verifyRoomBoxesVisible = async (roomBoxes, expectedCount = 3) => {
    await roomBoxes.first().waitFor({ state: 'visible' });
    await expect(roomBoxes).toHaveCount(expectedCount);

    const count = await roomBoxes.count();
    for (let i = 0; i < count; i++) {
        const box = roomBoxes.nth(i);
        await expect(box).toBeVisible();
    }
};
