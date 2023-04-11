import Head from 'next/head';
import { Header } from '../../components/Header';
import Image from 'next/image';
import fs, { readFile, stat } from 'fs/promises';
import Link from 'next/link';
import { basename } from 'path';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';

export default function Comic({
  id,
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  prevId,
  nextId,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name='description' content='Comics for developers' />
      </Head>

      <Layout>
        <section className='max-w-lg m-auto'>
          <h1 className='font-bold text-xl text-center mb-4'>{title}.</h1>
          <div className='mw-w-xs m-auto mb-4'></div>
          <Image width={width} height={height} src={img} alt={alt} />
          <p>{alt}</p>
          <div className='flex justify-between mt-4 font-bold'>
            {hasPrevious && <Link href={`/comic/${prevId}`}>Previous</Link>}
            {hasNext && <Link href={`/comic/${nextId}`}>Next</Link>}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const files = await fs.readdir('./comics');
  let paths = [];

  locales.forEach((locale) => {
    const pathsForLocale = files.map((file) => {
      const id = basename(file, '.json');
      return { params: { id }, locale };
    });
    paths = [...paths, ...pathsForLocale];
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

  return {
    props: {
      hasPrevious,
      hasNext,
      nextId,
      prevId,
      ...comic,
    },
  };
}
