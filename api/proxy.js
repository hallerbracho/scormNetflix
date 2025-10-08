const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const csvUrl = 'https://sheet.zohopublic.com/sheet/publishedsheet/46dd4522216d6bfa7c81b93a4df9234a67d3b3fab5eed1904b58fd5b5299f27b?type=grid&download=csv';

  // Añadir cabeceras CORS a la respuesta
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // Cachear por 5 minutos

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      return res.status(response.status).send('Error al obtener el CSV');
    }
    const csvText = await response.text();
    res.status(200).send(csvText);
  } catch (error) {
    res.status(500).send('Error en el servidor del proxy');
  }
};
