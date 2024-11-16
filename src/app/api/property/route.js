import { URI } from "@/app/lib/db";//connection to mongodb atlas
import puppeteer from 'puppeteer-extra';//fetching html page from url and find poyential data
import { Property } from "@/app/lib/model/property";//model defining structure and datatypes of table property
import mongoose from "mongoose";//orm for writing mongocode in js
import { NextResponse } from "next/server";
import StealthPlugin from "puppeteer-extra-plugin-stealth";//to tackle the denied functionality from magicBricks
puppeteer.use(StealthPlugin());

export const GET = async (req) => {//Api to fetch the list of property previsouly stored in db
    try {
        await mongoose.connect(URI);
        const data = await Property.find();
        console.log("database connected successfully");//confirmation message that db is connectefd successfully
        return NextResponse.json({ result: data });
    } catch (error) {
        console.log(error);//find potential error if any
    }
}

export const PUT = async (req, content) => {//Api to fetch the list of property previsouly stored in db
    try {
        await mongoose.connect(URI);
        const id = content.params._id;
        const data = await Property.findOne({ id });
        console.log("database connected successfully");//confirmation message that db is connectefd successfully
        return NextResponse.json({ result: data });
    } catch (error) {
        console.log(error);//find potential error if any
    }
}


export const POST = async (req) => {//for saving the fetched data
    try {
        await mongoose.connect(URI);
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });//to check url is came in req.body
        }
        try {

            const browser = await puppeteer.launch({ headless: true });// this will run a new instance of chromium also enables headless instance true so we can run browser in healdless mode help full in web scrapping and testing
            const page = await browser.newPage();

            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');// for anti bot measure as i m facing the issue of access denied 
            await page.setViewport({ width: 1280, height: 800 });
            // Navigate to the URL
            await page.goto(url, { waitUntil: 'load', timeout: 0 });

            // Extract data from the page
            const title = await page.$eval('.pad-r-4', (el) => el.textContent.trim()) || null;//in this  class title is stored
            const location = await page.$eval('.mb-ldp__dtls__title--link', (el) => el.textContent.trim()) || null;//this class i find from inspact for location
            const price = await page.$eval('.mb-ldp__dtls__price', (el) => el.textContent.trim()) || null;//for price
            const picture = await page.$eval('.mb-ldp__dtls__photo__fig img', (el) => el.getAttribute('src')) || null;//for image

            var data = {
                title: title,
                location: location,
                price: price,
                picture: picture,
                status: 'Completed',
                createdAt: Date.now(),
            }// i arrange the data object for db and also add a timestamp 
            const newProperty = new Property(data);//initialise a new schema 
            await newProperty.save();//add data in my table 

            return NextResponse.json({ success: 200, data: newProperty });// sends back response and data 
        } catch (error) {
            console.error('Scraping failed:', error);

            return NextResponse.json({ success: false, error: 'Failed to scrape data' }, { status: 500 });//eror handling
        }
    } catch (error) {
        console.error('Database connection or processing error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
};


