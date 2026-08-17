import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
const API_URL = BASE_URL + '/api';
// ── Credentials ────────────────────────────────────────────────────────────────
const yahooLoginPayload = {
  email: "kunikajain@yahoo.com",
  password: "Kunika@123"
}
const bookingPayload = {
  customerName: "kunika jain",
  customerEmail: "kunikajain@yahoo.com",
  customerPhone: "+916474738833",
  quantity: 1,
}

const USER_EMAIL = 'kunikajain27@gmail.com';
const USER_PASSWORD = 'Kunikajain@02';
let webContext;
let yahooToken;
let eventID;
let yahooBookingID;


// ── Helpers ────────────────────────────────────────────────────────────────────
async function login(page) {

  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);

  await page.locator('#password').fill(USER_PASSWORD);

  await page.getByRole("button", { name: 'Sign In' }).click();

}

test.beforeAll(async () => {

  const apiContext = await request.newContext();

  const yahooLoginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    {
      data: yahooLoginPayload
    });

  await expect(yahooLoginResponse.ok()).toBeTruthy();
  const yahooLoginResponseJson = await yahooLoginResponse.json();
  yahooToken = yahooLoginResponseJson.token;
  console.log(yahooToken);

  const eventsResponse = await apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events/1",
    {
      headers: {
        Authorization: `Bearer ${yahooToken}`,
      }
    }
  );
  await expect(eventsResponse.ok()).toBeTruthy();
  const eventsResponseJson = await eventsResponse.json();
  console.log(eventsResponseJson);
  eventID = eventsResponseJson.data.id;
  console.log(eventID);

  const bookingResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
    {
      headers: {
        Authorization: `Bearer ${yahooToken}`,
      },
      data: {
        customerName: "kunika jain",
        customerEmail: "kunikajain@yahoo.com",
        customerPhone: "+916474738833",
        quantity: 1,
        eventId: eventID
      }
    });

  await expect(bookingResponse.ok()).toBeTruthy();
  const bookingResponseJson = await bookingResponse.json();
  console.log(bookingResponseJson);
  yahooBookingID = bookingResponseJson.data.id;
  console.log(yahooBookingID);



})

test("Log in with Yahoo email", async ({ page }) => {

  await login(page);

  const cards = page.getByTestId("event-card");
  await expect(cards.nth(0)).toBeVisible();

  await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingID}`)

  await page.waitForLoadState('networkidle');

  await expect(page.locator(".mb-2")).toHaveText("Access Denied");
  await expect(page.locator(".mb-6")).toHaveText("You are not authorized to view this booking.");


  await page.pause();
})


// Instructors code
// import { test, expect } from '@playwright/test';

// const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
// const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';

// const YAHOO_USER = { email: 'Use your own credentials - 1', password: '' };
// const GMAIL_USER = { email: 'Use your own credentials - 2', password: '' };

// async function loginAs(page, user) {
//   await page.goto(`${BASE_URL}/login`);
//   await page.getByPlaceholder('you@email.com').fill(user.email);
//   await page.getByLabel('Password').fill(user.password);
//   await page.locator('#login-btn').click();
//   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
// }

// test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => {

//   // ── Step 1: Login as Yahoo user via API and get token ─────────────────────
//   const loginRes = await request.post(`${API_URL}/auth/login`, {
//     data: { email: YAHOO_USER.email, password: YAHOO_USER.password },
//   });
//   expect(loginRes.ok()).toBeTruthy();
//   const { token } = await loginRes.json();

//   // ── Step 2: Fetch events via API to get a valid event ID ──────────────────
//   const eventsRes = await request.get(`${API_URL}/events`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   expect(eventsRes.ok()).toBeTruthy();
//   const eventsData = await eventsRes.json();
//   const eventId = eventsData.data[0].id;

//   // ── Step 3: Create a booking via API as Yahoo user ────────────────────────
//   const bookingRes = await request.post(`${API_URL}/bookings`, {
//     headers: { Authorization: `Bearer ${token}` },
//     data: {
//       eventId,
//       customerName:  'Yahoo User',
//       customerEmail: YAHOO_USER.email,
//       customerPhone: '9999999999',
//       quantity:      1,
//     },
//   });
//   expect(bookingRes.ok()).toBeTruthy();
//   const yahooBookingId = (await bookingRes.json()).data.id;

//   console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);

//   // ── Step 4: Login as Gmail user via UI ────────────────────────────────────
//   await loginAs(page, GMAIL_USER);

//   // ── Step 5: Navigate directly to Yahoo's booking URL as Gmail user ────────
//   await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

//   // ── Step 6: Validate Access Denied ───────────────────────────────────────
//   await expect(page.getByText('Access Denied')).toBeVisible();
//   await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
// });
