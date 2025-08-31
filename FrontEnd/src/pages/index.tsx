import Screen from "@/components/Screen";
import CarsCard from '@/components/CarsCards'
import { useState } from "react";

export default function Home() {
  {/*eslint-disable-next-line */}
  const [error, setError] = useState<boolean>(true);
  {/*eslint-disable-next-line */}
  const [loading, setLoading] = useState<boolean>(false);
  {/*eslint-disable-next-line */}
  const [warning, setWarning] = useState<string>('');


  return (
    <Screen>
      <div className="index">
        <header className="gradient-red">
          <h1>Listagem de carros</h1>
        </header>

        <main>
          <h2>Carros</h2>
          
          <section className="cars-cards">
            <CarsCard setLoading={setLoading} setError={setError} setWarning={setWarning}></CarsCard>
          </section>
        </main>
      </div>
    </Screen>
  );
}
