import { URI } from "@/app/lib/db";
import puppeteer from 'puppeteer-extra';
import { Property } from "@/app/lib/model/property";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

export const POST = async (req) => {
    try {
        await mongoose.connect(URI);
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
        }

        // Create a new property record with "In Progress" status
        // const newProperty = new Property({ status: 'In Progress' });
        // await newProperty.save();

        try {
            // const browser = await puppeteer.launch();
            // const page = await browser.newPage();
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
            await page.setViewport({ width: 1280, height: 800 });
            // Navigate to the URL
            await page.goto(url, { waitUntil: 'load', timeout: 0 });

            await page.screenshot({ path: 'page-screenshot.png', fullPage: true });
            console.log("Screenshot saved as page-screenshot.png");

            // Extract data from the page
            const title = await page.$eval('h1', (el) => el.textContent.trim());
            const price = await page.$eval('.price', (el) => el.textContent.trim());
            const picture = await page.$eval('.propertyImage', (el) => el.getAttribute('src'));
            const location = await page.$eval('.loc', (el) => el.textContent.trim());
            const area = await page.$eval('.area', (el) => el.textContent.trim());

            // Update the property in the database
            newProperty.title = title;
            newProperty.location = location;
            newProperty.price = price;
            newProperty.picture = picture;
            newProperty.status = 'Completed';
            await newProperty.save();

            await browser.close();

            return NextResponse.json({ success: true, data: newProperty });
        } catch (error) {
            console.error('Scraping failed:', error);
            newProperty.status = 'Failed';
            await newProperty.save();
            return NextResponse.json({ success: false, error: 'Failed to scrape data' }, { status: 500 });
        }
    } catch (error) {
        console.error('Database connection or processing error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
};
