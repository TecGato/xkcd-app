import algoliasearch from 'algoliasearch/lite';

const APP_KEY = process.env.APP_KEY;
const APP_ID = process.env.APP_ID;

const client = algoliasearch(APP_ID, APP_KEY);
const index = client.initIndex('prod_comics');

const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 9,
  });

  CACHE[query] = hits;

  return { results: hits };
};
