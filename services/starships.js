const axios = require('axios');
const config = require('../config/index.js');

const getStarshipsByPage = async (url_page) => {
  try {
    return await axios.get(url_page)
  } catch (error) {

  }
}

exports.getAllStarships = async () => {
  let starships = [];
  let url = config.urls.starWarsAPI;
  let res;

  while (url) {
    res = await getStarshipsByPage(url);
    url = res.data.next;
    starships.push(...res.data.results);
  }
  return starships;
};
