import { randomInt } from "crypto";

export default class ApiRequests {
    constructor(requestContext) {
        this.request = requestContext;
        this.token = null;
        this.baseHeaders = {
            Origin: 'https://automationintesting.online',
            Referer: 'https://automationintesting.online/admin',
            'Content-Type': 'application/json',
        };
        this.price = randomInt(100, 600)
    };

    getAuthHeader() {
        return {
            ...this.baseHeaders,
            Cookie: `token=${this.token}`
        };
    };

    getPublicHeader() {
        return {
            ...this.baseHeaders,
            Referer: 'https://automationintesting.online'
        };
    }

    async loginInAdmin() {
        const response = await this.request.post('https://automationintesting.online/api/auth/login', {
            data: {
                password: 'password',
                username: 'admin'
            },
            headers: {
                Origin: 'https://automationintesting.online',
                Referer: 'https://automationintesting.online/admin',
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();
        console.log('Token', json);
        this.token = json.token;
    }

    async createRoom() {
        await this.request.post('https://automationintesting.online/api/room', {
            data: {
                roomName: "105",
                type: "Single",
                accessible: true,
                roomPrice: "111",
                features: ["WiFi", "TV", "Views"],
                description: "Please enter a description for this room",
                image: "https://www.mwtestconsultancy.co.uk/img/room1.jpg"
            },
            headers: this.getAuthHeader(),
            withCredentials: true
        });
    }

    async checkRoomInUser() {
        const response = await this.request.get('https://automationintesting.online/api/room');
        const json = await response.json();

        const rooms = json.rooms;
        const room105 = rooms.find(room => room.roomName === "105");

        if (room105) {
            console.log("Room 105 is found:", room105);
        } else {
            console.warn("Room 105 isnt found");
        }
    }

    async bookingRoom() {
        await this.request.post('https://automationintesting.online/api/booking', {
            data: {
                roomid: 3,
                firstname: "Test",
                lastname: "test",
                depositpaid: true,
                email: "uhezip78@gmail.com",
                phone: "+380637852611",
                bookingdates: {
                    checkin: "2025-07-13",
                    checkout: "2025-07-15"
                }
            },
            headers: this.getPublicHeader()
        });
    }

    async checkingBooking() {
        const expectedBooking = {
            roomid: 3,
            firstname: "Test",
            lastname: "test",
            depositpaid: true,
            checkin: "2025-07-13",
            checkout: "2025-07-15"
        };

        const response = await this.request.get('https://automationintesting.online/api/booking?roomid=3', {
            headers: this.getAuthHeader(),
            withCredentials: true
        });

        const json = await response.json();
        console.log(json);
        const bookings = json.bookings;

        const foundBooking = bookings.find(booking =>
            booking.roomid === expectedBooking.roomid &&
            booking.firstname === expectedBooking.firstname &&
            booking.lastname === expectedBooking.lastname &&
            booking.depositpaid === expectedBooking.depositpaid &&
            booking.bookingdates.checkin === expectedBooking.checkin &&
            booking.bookingdates.checkout === expectedBooking.checkout
        );

        if (foundBooking) {
            console.log("Bookind found:", foundBooking);
        } else {
            console.warn("Booking isnt found");
        }
    }

    async updateRoom() {
        await this.request.put('https://automationintesting.online/api/room/3', {
            data: {
                accessible: true,
                features: ["WiFi", "TV", "Radio"],
                roomName: "103",
                roomPrice: this.price,
                type: "Double",
            },
            headers: this.getAuthHeader(),
            withCredentials: true
        });
    }

    async checkingUpdate() {
        const response = await this.request.get('https://automationintesting.online/api/room');
        const json = await response.json();
        const room = json.rooms.find(r => r.roomid === 3);

        const expectedData = {
            roomName: "103",
            type: "Double",
            roomPrice: this.price,
            accessible: true,
            features: ["WiFi", "TV", "Radio"]
        };

        if (!room) {
            console.warn("Room isn`t found");
            return;
        }

        const isUpdated =
            room.roomName === expectedData.roomName &&
            room.type === expectedData.type &&
            room.roomPrice === expectedData.roomPrice &&
            room.accessible === expectedData.accessible &&
            expectedData.features.every(f => room.features.includes(f));

        if (isUpdated) {
            console.log("Data updated:", room);
        } else {
            console.warn("Data isn`t updated:", room);
        }
    }

    async deleteRoom() {
        await this.request.delete('https://automationintesting.online/api/room/5', {
            headers: this.getAuthHeader(),
            withCredentials: true
        });
    }

    async checkingDelete() {
        const response = await this.request.get('https://automationintesting.online/api/room');
        const json = await response.json();

        const isDeleted = !json.rooms.some(room => room.roomid === 5);

        if (isDeleted) {
            console.log("Room is deleted");
        } else {
            console.warn("Room isnt deleted");
        }
    }


    // For UI tests

    async deleteBookingsForRoom(roomName, checkinDate, checkoutDate) {
        if (!this.token) await this.loginInAdmin();

        const roomsRes = await this.request.get('https://automationintesting.online/api/room', {
            headers: this.getAuthHeader(), withCredentials: true
        });
        const rooms = (await roomsRes.json()).rooms || [];
        const room = rooms.find(r => r.roomName === roomName);

        const bookingsRes = await this.request.get(`https://automationintesting.online/api/booking?roomid=${room.roomid}`, {
            headers: this.getAuthHeader(), withCredentials: true
        });
        const bookings = (await bookingsRes.json()).bookings || [];

        const toDelete = bookings.filter(b =>
            b.bookingdates.checkin.slice(0, 10) === checkinDate &&
            b.bookingdates.checkout.slice(0, 10) === checkoutDate
        );

        for (const b of toDelete) {
            await this.request.delete(`https://automationintesting.online/api/booking/${b.bookingid}`, {
                headers: this.getAuthHeader(), withCredentials: true
            });
        }
    }

}