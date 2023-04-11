import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Container, Card, Row, Text } from '@nextui-org/react';
import fs from 'fs/promises';
import Link from 'next/link';

import { Layout } from '@/components/Layout';
import { useI18n } from '@/context/i18n';

export default function Home({ lastestComics }) {
  const { t } = useI18n();
  return (
    <>
      <Head>
        <meta name='description' content='Comics for developers' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        entusiasmo, creatividad y colaboración para el éxito del equipo.
      </Head>

      <Layout>
        <h2 className='text-3xl font-bold text-center mb-10'>
          {t('LATEST_COMICS')}
        </h2>
        <section className='grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
          {lastestComics.map((comic) => {
            return (
              <Link href={`/comic/${comic.id}`} key={comic.id}>
                <div className='mb-4 pb-4 m-auto'>
                  <h3 className='font-bold text-sm text-center pb-2'>
                    {comic.title}
                  </h3>
                  <div className='aspect-square'>
                    <Image
                      src={comic.img}
                      alt={comic.alt}
                      width={comic.width}
                      height={comic.height}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir('../comics');
  const lastesComicsFiles = files.slice(-8, files.length);
  const promisesReadFiles = lastesComicsFiles.map(async (file) => {
    const content = await fs.readFile(`../comics/${file}`, 'utf8');
    return JSON.parse(content);
  });
  const lastestComics = await Promise.all(promisesReadFiles);
  return {
    props: {
      lastestComics,
    },
  };
}
