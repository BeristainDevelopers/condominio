import puppeteer from "puppeteer";

export const generarPDF = async (html, outputPath) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "load" });

    await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
    });

    await browser.close();
};
