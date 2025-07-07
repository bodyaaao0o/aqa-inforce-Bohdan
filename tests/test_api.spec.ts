import { test } from '@playwright/test';
import ApiRequests from '../support/APIRequests';

test('Full API room lifecycle', async ({ request }) => {
    const api = new ApiRequests(request);
    
    //Log in
    await api.loginInAdmin();
    
    //Creating
    await api.createRoom();
    await api.checkRoomInUser();

    //Booking
    await api.bookingRoom();
    await api.checkingBooking();

    //Updating
    await api.updateRoom();
    await api.checkingUpdate();

    // Deleting
    await api.deleteRoom();
    await api.checkingDelete();
});
