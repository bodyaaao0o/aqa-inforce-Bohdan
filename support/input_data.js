import { expect } from '@playwright/test';

export const fillValidBookingData = async(pm, data) => {
    await pm.room().getFirstNameInput().fill(data.validFirstName);
    await pm.room().getLastNameInput().fill(data.validLastName);
    await pm.room().getEmailInput().fill(data.validEmail);
    await pm.room().getPhoneInput().fill(data.validPhone);
};

export const fillInvalidBookingData = async(pm, data) => {
    await pm.room().getFirstNameInput().fill(data.invalidFirstName);
    await pm.room().getLastNameInput().fill(data.invalidLastName);
    await pm.room().getEmailInput().fill(data.invalidEmail);
    await pm.room().getPhoneInput().fill(data.invalidPhone);
    await pm.room().getReserveNowButton().click();
};

export const verifyBookingRequestPayload = (request, expected) => {
    const payload = request.postDataJSON();
    
    expect(payload.firstname).toBe(expected.validFirstName);
    expect(payload.lastname).toBe(expected.validLastName);
    expect(payload.email).toBe(expected.validEmail);
    expect(payload.phone).toBe(expected.validPhone);
};

export const clickAndWaitForRequest = async (page, urlMask, action) => {
    const [request] = await Promise.all([
        page.waitForRequest(urlMask),
        action()
    ]);
    return request;
};
