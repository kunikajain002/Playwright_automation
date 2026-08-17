import { test, expect } from '@playwright/test';

const URL      = 'https://eventhub.rahulshettyacademy.com'
// ── Credentials ────────────────────────────────────────────────────────────────
const USER_EMAIL    = 'kunikajain27@gmail.com';// update email and password with your account
const USER_PASSWORD = 'Kunikajain@02'; 

// ── Helpers ────────────────────────────────────────────────────────────────────
async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  // Located by placeholder
  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);

  // Located by label
  await page.getByLabel('Password').fill(USER_PASSWORD);

  // Located by id
  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('test', async ({ page }) => {

  await login(page);
  await page.goto(URL + "/login");
  const future = new Date();
  const titleText = "Event Assignment for Automation";
  // await page.getByRole('textbox', { name: 'Email' }).fill('kunikajain27@gmail.com');
  // await page.getByRole('textbox', { name: 'Password' }).fill('Kunikajain@02');
  // await page.getByRole('button', { name: 'Sign In' }).click();
  // await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  // await page.getByRole('button', { name: 'Admin' }).click();
  // await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
  // await page.getByTestId('event-title-input').fill(titleText);
  // await page. getByPlaceholder("Describe the event…").fill("We are having an Event for the people who lives.");
  // await page.getByLabel("City").fill("Delhi");
  // await page.getByLabel("Venue").fill("CP");

  // future.setDate(future.getDate() + 7);
  // future.setHours(15,30);

  // // padStart() adds zeros to the beginning until the string has length 2
  // const month = String(future.getMonth()+2).padStart(2,"0"); // getMonth() gives number of months, String() because it gives us 07
  // const day = String(future.getDate()).padStart(2,"0");
  // const year = future.getFullYear();

  // let hours = future.getHours();
  // const minutes = String(future.getMinutes()).padStart(2,"0");

  // const date = `${month}/${day}/${year}`;
  // const time = `${hours}:${minutes}`;
  // console.log(date);
  // console.log(time);

  // const input = page.getByLabel("Event Date & Time");

  // await input.click();
  // await input.pressSequentially(date);
  // await input.press("Tab");
  // await input.pressSequentially(time);
  // await input.press("ArrowDown");

  // await page.getByLabel("Price ($)").fill("75");
  // await page.getByLabel("Total Seats").fill("700");
  // await page.getByRole("button", {name: "+ Add Event"}).click(); 

  await page.getByTestId('nav-events').click();
  const cards = page.getByTestId("event-card");
  await expect(cards.nth(0)).toBeVisible();
  await expect(cards.filter({hasText: titleText})).toBeVisible();

  const textBefore = await cards.filter({hasText: titleText}).locator(".text-emerald-600").textContent();
  const seatsBeforeBooking = parseInt(textBefore, 10);
  console.log(seatsBeforeBooking);

  await cards.filter({hasText: titleText}).getByTestId("book-now-btn").click();

  await expect(page.locator("#ticket-count")).toBeVisible();
  await page.getByLabel("Full Name").fill("Kunika Jain");
  await page.locator("#customer-email").fill("kunikajain27@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
  await page.locator(".confirm-booking-btn").click();

  const bookingRef = await page.locator(".booking-ref").textContent();
  await expect(page.locator(".booking-ref")).toBeVisible();
  console.log(bookingRef);

  await page.getByRole('button', {name: "View My Bookings"}).click();
  await expect(page).toHaveURL(URL + "/bookings");

  const bookingHistory = page.locator("#booking-card");
  await expect(bookingHistory.first()).toBeVisible();

  await expect(bookingHistory.filter({hasText: bookingRef})).toBeVisible();
  await expect(bookingHistory.filter({hasText: bookingRef}).filter({hasText: titleText})).toBeVisible();

  await page.getByTestId('nav-events').click();
  await page.waitForLoadState("networkidle");

  await expect(cards.nth(0)).toBeVisible();
  await expect(cards.filter({hasText: titleText})).toBeVisible();

  const textAfter = await cards.filter({hasText: titleText}).locator(".text-emerald-600").textContent();
  const seatsAfterBooking = parseInt(textAfter, 10);
  console.log(seatsAfterBooking);
  await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

});


// const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
// // ── Credentials ────────────────────────────────────────────────────────────────
// const USER_EMAIL    = 'replacewithyourcredentials@gmail.com';// update email and password with your account
// const USER_PASSWORD = 'yourpassword'; 

// // ── Helpers ────────────────────────────────────────────────────────────────────
// async function login(page) {
//   await page.goto(`${BASE_URL}/login`);

//   // Located by placeholder
//   await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);

//   // Located by label
//   await page.getByLabel('Password').fill(USER_PASSWORD);

//   // Located by id
//   await page.locator('#login-btn').click();

//   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
// }


// ── Test ───────────────────────────────────────────────────────────────────────
// test('create event via UI, book it, and verify seat reduction', async ({ page }) => {

//   // ── Step 1: Log in ───────────────────────────────────────────────────────
//   await login(page);

//   // ── Step 2: Create a new event via the admin form ────────────────────────
//   await page.goto(`${BASE_URL}/admin/events`);

//   // Unique title so we can find this exact card later
//   const eventTitle = `Test Event ${Date.now()}`;

//   // Located by id (explicit on the component)
//   await page.locator('#event-title-input').fill(eventTitle);

//   // Description — only textarea in the form
//   await page.locator('#admin-event-form textarea').fill('Playwright test event');

//   // Located by label (Select auto-generates id from label text)
//   await page.getByLabel('City').fill('Test City');
//   await page.getByLabel('Venue').fill('Test Venue');

//   // datetime-local input — located by label
//   await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

//   await page.getByLabel('Price ($)').fill('100');
//   await page.getByLabel('Total Seats').fill('50');

//   // Located by id
//   await page.locator('#add-event-btn').click();

//   // Wait for success toast
//   await expect(page.getByText('Event created!')).toBeVisible();

//   console.log(`Created event: "${eventTitle}"`);

//   // ── Step 3: Go to Events page and find the newly created card ─────────────
//   await page.goto(`${BASE_URL}/events`);

//   // Located by data-testid
//   const eventCards = page.getByTestId('event-card');
//   await expect(eventCards.first()).toBeVisible();

//   // Scan all visible event cards for the one matching our created title
//   const targetCard = eventCards.filter({ hasText: eventTitle }).first();
//   await expect(targetCard).toBeVisible({ timeout: 5000 });

//   // Capture seat count before booking
//   const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
//   console.log(`Seats before booking: ${seatsBeforeBooking}`);

//   // Located by data-testid inside the matched card
//   await targetCard.getByTestId('book-now-btn').click();

//   // ── Step 4: Fill the booking form ────────────────────────────────────────

//   // Quantity defaults to 1 — verify via id
//   const ticketCount = page.locator('#ticket-count');
//   await expect(ticketCount).toHaveText('1');

//   // Located by label
//   await page.getByLabel('Full Name').fill('Test Student');

//   // Located by id
//   await page.locator('#customer-email').fill('test.student@example.com');

//   // Located by placeholder
//   await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

//   // Located by CSS class
//   await page.locator('.confirm-booking-btn').click();

//   // ── Step 5: Verify booking confirmation ──────────────────────────────────

//   // Located by CSS class
//   const bookingRefEl = page.locator('.booking-ref').first();
//   await expect(bookingRefEl).toBeVisible();

//   const bookingRef = (await bookingRefEl.innerText()).trim();
//   expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

//   console.log(`Booking confirmed. Ref: ${bookingRef}`);

//   // ── Step 6: Verify booking appears in My Bookings ────────────────────────
//   await page.getByRole('link', { name: 'View My Bookings' }).click();
//   await expect(page).toHaveURL(`${BASE_URL}/bookings`);

//   // Located by id
//   const bookingCards = page.locator('#booking-card');
//   await expect(bookingCards.first()).toBeVisible();

//   // Find the card that contains our booking ref (via CSS class inside the card)
//   const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
//   await expect(matchingCard).toBeVisible();

//   // Verify event title also appears in the same card
//   await expect(matchingCard).toContainText(eventTitle);

//   console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);

//   // ── Step 7: Verify seat count reduced on Events page ─────────────────────
//   await page.goto(`${BASE_URL}/events`);
//   await expect(eventCards.first()).toBeVisible();

//   // Find the same event by title
//   const updatedCard       = eventCards.filter({ hasText: eventTitle }).first();
//   await expect(updatedCard).toBeVisible();

//   const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
//   console.log(`Seats after booking: ${seatsAfterBooking}`);

//   // Booked 1 ticket — count must drop by exactly 1
//   expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
// });
