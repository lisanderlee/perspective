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
        <h1 className="text-white  font-bold text-5xl">Understanding the Impact</h1>
        <p className="text-white font-normal text-2xl mt-12">The recent tragic events in Israel have left us all shaken. Over the past weekend, a surge of violence, attributed to Hamas, has deeply impacted the nation and its people.</p>
        <p className="text-white font-normal text-2xl mt-12">To comprehend the magnitude of the suffering, let’s consider the numbers: Israel has a population of approximately 9.364 million people. The loss and pain experienced by the nation during these attacks are immeasurable.</p>
        <p className="text-white font-normal text-2xl mt-12">If we were to translate the impact of such an event to a country like <span className=" text-2xl font-bold text-sky-400">{country}</span>, considering its population, it would be akin to witnessing <span className=" text-2xl font-bold text-sky-400">{Math.floor((population*1200)/9364000)} </span> lives abruptly and tragically halted.</p>
        <h1 className="mt-20 text-white  font-bold text-3xl">A Note of Solidarity</h1>  
        <p className="text-white font-normal text-xl mt-12">In these trying times, our thoughts are with all those affected by the attacks. We stand in solidarity with the families who are navigating through this period of grief and loss.</p>
        <h1 className="mt-20 text-white  font-bold text-3xl">Seeking a Path Forward</h1>  
        <p className="text-white font-normal text-xl mt-12">As we reflect on these events, let us also ponder on the paths that lead towards peace and understanding, ensuring that the futures we build are rooted in respect and the collective desire to prevent further suffering.</p>

        </div>
      </div>
    </main>
  );
}

