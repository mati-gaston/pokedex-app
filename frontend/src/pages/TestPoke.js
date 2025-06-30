import React, { useEffect, useState } from 'react';

function TestPoke() {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPokemones = async () => {
      setCargando(true);
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await res.json();
        console.log('Datos recibidos:', data);

        setPokemones(data.results);
      } catch (error) {
        console.error('Error al obtener pokemones:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchPokemones();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Prueba de PokeAPI</h2>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {pokemones.map((poke, i) => (
            <li key={i}>{poke.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TestPoke;
