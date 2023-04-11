import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.css';
import { I18NProvider, useI18n } from '@/context/i18n';

const DefaultHeadApp = () => {
  const { t } = useI18n();
  return (
    <Head>
      <title>{t('SEO_TITLE_DEFAULT')}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <I18NProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />;
      </I18NProvider>
    </NextUIProvider>
  );
}
