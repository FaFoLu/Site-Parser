// Підключаємо бібліотеку puppeteer
const puppeteer = require("puppeteer");

// Оголошуємо асинхронну функцію start, яка буде виконувати наші дії
async function start() {
  // Запускаємо новий браузер у headless режимі
  const browser = await puppeteer.launch({ headless: "new" });

  // Відкриваємо нову сторінку
  const page = await browser.newPage();

  try {
    // Переходимо на веб-сторінку з вказаним посиланням (замініть 'site link' на справжнє посилання)
    await page.goto("site link");

    // Зберігаємо скріншот сторінки в файл з ім'ям 'example.png'
    await page.screenshot({ path: "example.png" });

    // Виводимо повідомлення про успішне збереження скріншоту
    console.log("Зображення збережено у example.png");
  } catch (error) {
    // Якщо сталася помилка, виводимо її у консоль
    console.error("Помилка:", error);
  } finally {
    // Завершуємо роботу браузера
    await browser.close();
  }
}

// Викликаємо функцію start для початку роботи з браузером і отримання скріншоту
start();
