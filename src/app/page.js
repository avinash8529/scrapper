"use client"
import PropertyList from "./user/propertyList";
import UserInput from "./user/userInput";

export default function Home() {
  return (
    <main className="container-fluid">
      <h1 className="text-center mt-3">Scrapper Application</h1>
      <UserInput />
      <PropertyList />
    </main>

  );
}
