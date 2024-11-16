import { URI } from "@/app/lib/db";//connection to mongodb atlas
import { Property } from "@/app/lib/model/property";//model defining structure and datatypes of table property
import mongoose from "mongoose";//orm for writing mongocode in js
import { NextResponse } from "next/server";

export const GET = async (req, content) => {//Api to fetch the list of property previsouly stored in db
    try {
        await mongoose.connect(URI);
        console.log("database connected successfully");//confirmation message that db is connectefd successfully
        const id = content.params.propertyid;
        console.log(id)
        const data = await Property.findOne({ _id: id });
        return NextResponse.json({ result: data });
    } catch (error) {
        console.log(error);//find potential error if any
    }
}