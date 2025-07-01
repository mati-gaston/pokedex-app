import React, { useEffect, useState } from 'react';

/**
 * Componente Pokedex
 * Muestra una lista de Pokémon con paginación, buscador y detalles.
 */
function Pokedex() {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

    /**
   * useEffect: se ejecuta cada vez que cambia la página.
   * Carga 20 Pokémon desde la API según el número de página.
   */
  useEffect(() => {
    const obtenerPokemones = async () => {
      setCargando(true);

      try {
        const offset = (paginaActual - 1) * 20;
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        const datos = await respuesta.json();

        // Carga de detalles de cada pokemon
        const detalles = await Promise.all(
          datos.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemones(detalles);
      } catch (error) {
      } finally {
        setCargando(false);
      }
    };

    obtenerPokemones();
  }, [paginaActual]);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const pokemonesFiltrados = pokemones.filter(poke =>
    poke.name.toLowerCase().includes(busqueda)
  );

  return (
    <div className="container">
      <h1 className="mb-4 text-center pokedex-title">Pokedex</h1>

      {/* Buscador */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Buscar Pokémon por nombre..."
          value={busqueda}
          onChange={manejarBusqueda}
        />
      </div>

      {cargando ? (
        <p className="text-center">Cargando Pokémon...</p>
      ) : (
        <>
          <div className="row">
            {(busqueda ? pokemonesFiltrados : pokemones).map((poke) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={poke.id}>
                <div className="card pokemon-card text-center h-100 shadow-sm">
                  <img
                    src={poke.sprites.front_default}
                    className="pokemon-img card-img-top mx-auto mt-3"
                    alt={poke.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{poke.name}</h5>
                    <p className="card-text">ID: {poke.id}</p>
                    <p className="card-text"> <strong>Tipos:</strong><br/> {poke.types.map(t => ( <span key={t.type.name} className="badge-type">{t.type.name}</span> ))} </p>
                    <p className="card-text">
                      <strong>Habilidades:</strong> {poke.abilities.map(a => a.ability.name).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación (oculta si se busca algo) */}
          {!busqueda && (
            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2 pagination-controls">
              <button
                className="btn btn-outline-primary"
                onClick={() => setPaginaActual(1)}
                disabled={paginaActual === 1}
              >
                Pokedex
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
              >
                Anterior
              </button>

              <span className="fw-bold">Página {paginaActual}</span>

              <button
                className="btn btn-secondary"
                onClick={() => setPaginaActual(prev => prev + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Pokedex;
