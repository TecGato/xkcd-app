import { Header } from './Header';
import { Footer } from '@/components/Footer';

export const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>
      <Footer />
    </>
  );
};
