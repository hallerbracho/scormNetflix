// La función 'handler' es el punto de entrada que Netlify ejecutará.
exports.handler = async function(event, context) {
  // 1. Define la URL del archivo CSV de Zoho al que queremos acceder.
  const ZOHO_CSV_URL = 'https://sheet.zohopublic.com/sheet/publishedsheet/46dd4522216d6bfa7c81b93a4df9234a67d3b3fab5eed1904b58fd5b5299f27b?type=grid&download=csv';

  try {
    // 2. Haz la petición a Zoho desde el servidor de Netlify.
    // Usamos 'fetch', que está disponible en las funciones de Netlify.
    const response = await fetch(ZOHO_CSV_URL);

    // Si la respuesta de Zoho no es exitosa (ej: error 404 o 500), lanzamos un error.
    if (!response.ok) {
      throw new Error(`Error al obtener el CSV de Zoho. Estado: ${response.status}`);
    }

    // 3. Obtén el contenido del CSV como texto.
    const csvText = await response.text();

    // 4. ¡LA PARTE CLAVE! Devuelve una respuesta exitosa al navegador.
    // Incluimos las cabeceras CORS para que el navegador no bloquee la respuesta.
    return {
      statusCode: 200, // Código 200 = OK
      headers: {
        'Access-Control-Allow-Origin': '*', // Permite el acceso desde cualquier dominio
        'Content-Type': 'text/csv'          // Indica al navegador que la respuesta es un CSV
      },
      body: csvText // El contenido del archivo CSV
    };

  } catch (error) {
    // 5. Si algo sale mal, devuelve un error.
    console.error('Error en la Netlify Function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*' // También permite CORS en los errores
      },
      body: JSON.stringify({ error: 'No se pudo obtener el archivo CSV.' })
    };
  }
};
