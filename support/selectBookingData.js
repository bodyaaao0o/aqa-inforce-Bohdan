export const selectDateRange = async (page, dayButtons, startDayText, endDayText) => {
    const getCenter = async (button) => {
        const box = await button.boundingBox();
        if (!box) throw new Error('No bounding box for date button');
        return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    };

    const start = dayButtons.filter({ hasText: startDayText }).first();
    const end = dayButtons.filter({ hasText: endDayText }).first();

    const startPos = await getCenter(start);
    const endPos = await getCenter(end);

    await page.mouse.move(startPos.x, startPos.y);
    await page.mouse.down();
    await page.mouse.move(endPos.x, endPos.y, { steps: 10 });
    await page.mouse.up();
};