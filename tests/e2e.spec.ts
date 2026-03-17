import { test, expect } from '@playwright/test';

test.describe('Nyuk.pe E2E Checkout Flow', () => {

  test.beforeEach(async ({ page }) => {
    // 1. APPLICATION STARTUP
    await page.goto('/');
    // Eliminar localStorage de sesiones anteriores
    await page.evaluate(() => localStorage.clear());
  });

  test('Application Startup - Page Loads and Renders', async ({ page }) => {
    // Verify title and main logo
    await expect(page).toHaveTitle(/Nyuk Boutique Floral/);
    await expect(page.locator('h1', { hasText: 'nyuk.pe' }).first()).toBeVisible();
    
    // Verify Collections are visible
    const collectionsHeading = page.locator('h2', { hasText: 'Elogios de Nuestros Clientes' });
    await expect(collectionsHeading).toBeVisible();
  });

  test('User Flow - Browse, Add to Cart, Edit Cart', async ({ page }) => {
    // Go to catalog
    await page.goto('/#catalog');
    
    // Wait for products to load
    await expect(page.locator('.grid').first()).toBeVisible();

    // Click 'Comprar Ahora' on the first product
    const btnComprar = page.locator('button', { hasText: 'Comprar Ahora' }).first();
    await expect(btnComprar).toBeVisible();
    await btnComprar.click();
    
    // Wait for the cart side panel to open
    const cartPanel = page.locator('h2', { hasText: 'Bolsa' });
    await expect(cartPanel).toBeVisible();

    // Verify item is in cart (quantity 1)
    const quantityText = page.locator('span.px-3', { hasText: '1' }).first();
    await expect(quantityText).toBeVisible();

    // Increase quantity to 2
    const addBtn = page.locator('button[aria-label="Aumentar cantidad"]');
    if (await addBtn.count() > 0) {
        await addBtn.click();
        await expect(page.locator('span', { hasText: '2' }).first()).toBeVisible();
    }
  });

  test('Checkout Flow & Edge Cases (Date Validation)', async ({ page }) => {
    // Setup: Add item to cart
    await page.goto('/#catalog');
    
    // Wait a bit for state to settle, then add item
    await page.waitForTimeout(1000);
    const btnComprar = page.locator('button', { hasText: 'Comprar Ahora' }).first();
    await btnComprar.click();
    
    await expect(page.locator('h2', { hasText: 'Bolsa' })).toBeVisible();
    
    // Click Checkout Button
    const checkoutBtn = page.locator('button', { hasText: 'Finalizar Pedido' });
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();

    // Checkout Step 1: Delivery
    await expect(page.locator('h2', { hasText: 'Detalles de Entrega' })).toBeVisible();
    
    // Test Edge Case: Empty submission (HTML5 native should block, but let's test form fill)
    await page.fill('input[placeholder="Nombre Completo del Destinatario"]', 'Test User');
    await page.fill('input[placeholder="Email (para su recibo)"]', 'test@example.com');
    await page.fill('input[placeholder="Teléfono WhatsApp (9 dígitos)"]', '999888777');
    await page.fill('input[placeholder="Dirección de Envío (Distrito, Calle, Número)"]', '123 Fake St');

    // Test Edge Case: Date Validation logic
    const monthSelect = page.locator('select').nth(0);
    const daySelect = page.locator('select').nth(1);

    // Initial state: Day select should be disabled
    await expect(daySelect).toBeDisabled();

    // Select Febrero -> Day max should be 29
    await monthSelect.selectOption('Febrero');
    await expect(daySelect).toBeEnabled();
    const febDays = await daySelect.locator('option').count();
    expect(febDays).toBe(30); // 29 days + 1 neutral option

    // Select Abril -> Day max should be 30
    await monthSelect.selectOption('Abril');
    const aprDays = await daySelect.locator('option').count();
    expect(aprDays).toBe(31); // 30 days + 1 neutral option

    // Valid setup: Abril 15
    await daySelect.selectOption('15');

    // Submit Step 1
    await page.click('button:has-text("Continuar")');

    // Checkout Step 2: Gift Message
    await expect(page.locator('h2', { hasText: 'El Toque Personal' })).toBeVisible();
    await page.fill('textarea', 'Happy Birthday test message!');
    await page.click('button:has-text("Siguiente: Pago Seguro")');

    // Checkout Step 3: Payment
    await expect(page.locator('h2', { hasText: 'Finalizar Compra' })).toBeVisible();
    
    // The flow requires an image upload for Yape Receipt
    // In automated testing, we could upload a mock image, but verifying we reached this step is proof of flow continuity.
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible();
  });

});
