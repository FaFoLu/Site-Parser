// Підключаємо бібліотеку puppeteer
const puppeteer = require("puppeteer");

// Оголошуємо асинхронну функцію `start`, в якій будемо виконувати наш приклад
async function start() {
    // Запускаємо новий браузер
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage(); // Відкриваємо нову сторінку

    // Переходимо на веб-сторінку
    await page.goto('https://www.blockchain.com/explorer/assets/btc');

    // Здійснюємо скріншот сторінки і зберігаємо його у файлі `blockchain.png` в папці `examples/example-1`
    await page.screenshot({ path: './examples/example-1/blockchain.png' });

    // Виводимо повідомлення про успішне збереження скріншоту
    console.log('Зображення збережено у blockchain.png');

    // Закриваємо браузер
    await browser.close();
}

// Викликаємо асинхронну функцію `start`, щоб запустити наш приклад
start();



