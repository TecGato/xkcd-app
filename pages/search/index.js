import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { search } from '../../services/search';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/context/i18n';

export default function Component({ query, results }) {
  const { t } = useI18n();
  return (
    <>
      <head>
        <title>xkcd - Results for {query}</title>
        <meta name='description' content={`Search results for ${query}`} />
      </head>

      <Layout>
        <h1>{t('SEARCH_RESULTS_TITLE', results.length, query)}</h1>
        {results.map((result) => {
          return (
            <Link
              href={`/comic/${result.id}`}
              key={result.id}
              className='bg-slate-300 hover:bg-slate-50 flex flex-row justify-start content-center'
            >
              <Image
                src={result.img}
                width='50'
                height='50'
                alt={result.alt}
                className='rounded-full'
              />
              <div>
                <h2>{result.title}</h2>
              </div>
            </Link>
          );
        })}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = '' } = query;

  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}
