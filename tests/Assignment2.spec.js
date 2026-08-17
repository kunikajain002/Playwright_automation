import {test, expect} from '@playwright/test';

const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
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

test('Test for Refund Eligibility Check', async ({page})=>
{
    await login(page);
    const titleText = "Event Assignment for Automation";

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
      await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    
      const bookingHistory = page.locator("#booking-card");
      await expect(bookingHistory.first()).toBeVisible();
    
      await expect(bookingHistory.filter({hasText: bookingRef})).toBeVisible();
      await expect(bookingHistory.filter({hasText: bookingRef}).filter({hasText: titleText})).toBeVisible();
      await bookingHistory.filter({hasText: bookingRef}).getByRole('button', {name:"View Details"}).click();
      await page.waitForLoadState('networkidle');

      await expect(page.getByText(titleText).first()).toBeVisible();
      await expect(bookingRef[0]).toBe(titleText[0]);
      
      await page.getByRole('button', {name: "Check eligibility for refund?"}).click();
      await expect(page.locator("#refund-spinner")).toBeVisible();

      const refundDetails =  page.locator("#refund-result");
      const refundEligiblity = await refundDetails.textContent();
      await expect(refundEligiblity).toContain("Eligible for refund.");
      await expect(refundEligiblity).toContain("Single-ticket bookings qualify for a full refund.");

});

test('Group ticket booking is NOT eligible for refund', async ({page}) =>
{
  await login(page);
    const titleText = "Event Assignment for Automation";

    await page.getByTestId('nav-events').click();
    const cards = page.getByTestId("event-card");
      await expect(cards.nth(0)).toBeVisible();
      await expect(cards.filter({hasText: titleText})).toBeVisible();
    
      const textBefore = await cards.filter({hasText: titleText}).locator(".text-emerald-600").textContent();
      const seatsBeforeBooking = parseInt(textBefore, 10);
      console.log(seatsBeforeBooking);
    
      await cards.filter({hasText: titleText}).getByTestId("book-now-btn").click();

      await page.getByRole("button", {name: "+"}).click();

      await page.getByLabel("Full Name").fill("Kunika Jain");
      await page.locator("#customer-email").fill("kunikajain27@gmail.com");
      await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
      await page.locator(".confirm-booking-btn").click();
    
      const bookingRef = await page.locator(".booking-ref").textContent();
      await expect(page.locator(".booking-ref")).toBeVisible();
      console.log(bookingRef);
    
      await page.getByRole('button', {name: "View My Bookings"}).click();
      await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    
      const bookingHistory = page.locator("#booking-card");
      await expect(bookingHistory.first()).toBeVisible();
    
      await expect(bookingHistory.filter({hasText: bookingRef})).toBeVisible();
      await expect(bookingHistory.filter({hasText: bookingRef}).filter({hasText: titleText})).toBeVisible();
      await bookingHistory.filter({hasText: bookingRef}).getByRole('button', {name:"View Details"}).click();
      await page.waitForLoadState('networkidle');

      await expect(page.getByText(titleText).first()).toBeVisible();
      await expect(bookingRef[0]).toBe(titleText[0]);

      await page.getByRole('button', {name: "Check eligibility for refund?"}).click();
      await expect(page.locator("#refund-spinner")).toBeVisible();

      const refundDetails =  page.locator("#refund-result");
      const refundEligiblity = await refundDetails.textContent();

      await expect(refundEligiblity).toContain("Not eligible for refund.");
      await expect(refundEligiblity).toContain("Group bookings (2 tickets) are non-refundable.");

});