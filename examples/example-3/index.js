// Підключаємо бібліотеку puppeteer
const puppeteer = require('puppeteer');

// Вказуємо URL сторінки, з якої хочемо отримати скріншот
const url = 'https://ua.sinoptik.ua/погода-київ/завтра';

// Використовуємо асинхронну функцію самовиклику 
(async () => {
  // Запускаємо новий браузер у headless режимі
  const browser = await puppeteer.launch({ headless: "new" });

  // Відкриваємо нову сторінку
  const page = await browser.newPage();

  try {
    // Переходимо на веб-сторінку
    await page.goto(url);

    // Очікуємо, доки на сторінці з'явиться необхідний елемент з погодою
    await page.waitForSelector('#blockDays > div.tabsContent > div');

    // Отримуємо розміри та позицію блоку з погодою на сторінці
    const weatherElement = await page.$('#blockDays > div.tabsContent > div');
    const boundingBox = await weatherElement.boundingBox();
    const x = boundingBox.x;
    const y = boundingBox.y;
    const width = boundingBox.width;
    const height = boundingBox.height;

    // Здійснюємо скріншот лише блоку з погодою
    await page.setViewport({ width: width, height: height });
    await page.screenshot({ path: './examples/example-3/weather.png', clip: { x: x, y: y, width: width, height: height } });

    // Виводимо повідомлення про успішне збереження скріншоту
    console.log('Зображення збережено у weather.png');

    // Підключаємо бібліотеку Jimp для редагування зображення
    const Jimp = require('jimp');

    // Завантажуємо фото weather.png за допомогою Jimp
    const image = await Jimp.read('./examples/example-3/weather.png');

    // Обрізаємо зображення зліва та справа на 2 пікселі
    image.crop(4, 0, image.bitmap.width - 8, image.bitmap.height);

    // Зберігаємо обрізане зображення
    await image.writeAsync('./examples/example-3/weather_cropped.png');

    // Виводимо повідомлення про успішне обрізання та збереження зображення
    console.log('Зображення обрізано та збережено у weather_cropped.png');
  } catch (error) {
    // Якщо сталася помилка, виводимо її у консоль
    console.error('Помилка:', error);
  } finally {
    // Завершуємо роботу браузера
    await browser.close();
  }
})();
