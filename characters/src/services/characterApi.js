// Servicio para obtener datos de personajes desde la API de Rick & Morty

export const characterApi = {
  async getCharacterById(id) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    if (!response.ok) throw new Error('Character not found');
    return await response.json();
  },
};
