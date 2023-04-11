import { useI18n } from '@/context/i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className='text-center pb-4 pt-4'>
      <a herf='https://xkcd.com/' target='_blank' rel='noopener noreferrer'>
        {t('FOOTER_TEXT')}
      </a>
    </footer>
  );
}
