"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [country, setCountry] = useState(null);
  const [population, setPopulation] = useState(null);

  useEffect(() => {
    // Get user's country based on IP
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setCountry(data.country_code_iso3);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    // Get country's population
    const fetchPopulation = async (countryName) => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const [data] = await res.json();
        setPopulation(data.population);
      } catch (error) {
        console.error('Error fetching population:', error);
      }
    };
    if (country) {
      fetchPopulation(country);
    }
  }, [country]);
  console.log(population);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1 className=" text-white">Your Country: {country}</h1>
          <h2 className=" text-white">Population: {(population*1200)/9364000}</h2>
        </div>
      </div>
    </main>
  );
}

