import { Link, Container, useRealShape } from '@nextui-org/react';
import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();
    if (!q) return;
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      });
  };

  const restOfLocales = locales.filter((local) => local !== locale);

  return (
    <header className='flex justify-between  items-center p-4 max-w-xl m-auto'>
      <h1 className='font-bold'>
        <Link href='/' className='transition hover:opacity-80'>
          Next<span className='font-light'>xkcd</span>
        </Link>
      </h1>
      <nav>
        <ul className='flex flex-row gap-2'>
          <li>
            <Link href='/' className='text-sm font-bold'>
              Home
            </Link>
          </li>
          <li>
            <Link href={`/${restOfLocales[0]}`} className='text-sm font-bold'>
              {restOfLocales[0]}
            </Link>
          </li>
          <li>
            {/* <Link passHref='/search' className='text-sm font-bold'> */}
            <input
              className='rounded-3xl border-gray-400 px-4 py-1 border text-xs'
              ref={searchRef}
              type='search'
              onChange={handleChange}
            />
            <div className='relative z-10'>
              {results.length > 0 && (
                <div className='absolute top-0 left-0'>
                  <ul className='w-full border border-gray-50 rounded-lg shadow-xl z-50 bg-white overflow-hidden'>
                    <li key='all- results' className='m-0'>
                      <Link
                        href={`/search?q=${getValue()}`}
                        className='text-gray-400 italic text-sm font-semibold hover:bg-slate-200 block px-2 py-1'
                      >
                        Ver {results.length} Resultados
                      </Link>
                    </li>
                    {results.map((result) => {
                      return (
                        <li key={result.id} className='m-0'>
                          <Link
                            href={`/comic/${result.id}`}
                            className='text-sm font-semibold hover:bg-slate-200 block px-2 py-1'
                          >
                            {result.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            {/* </Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}
