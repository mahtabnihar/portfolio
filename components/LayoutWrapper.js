import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import headerNavLinks from '@/data/headerNavLinks';
import Link from './Link';
import SectionContainer from './SectionContainer';
import Footer from './Footer';
import BlobCursor from './BlobCursor';
import DarkVeil from './DarkVeil';
import PillNav from './PillNav';

const SunIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const LayoutWrapper = ({ children }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const path = router.asPath.split(/[?#]/)[0] || '/';
  const activeHref =
    headerNavLinks.find((link) =>
      link.href === '/' ? path === '/' : path === link.href || path.startsWith(`${link.href}/`)
    )?.href ?? '';
  const dark = mounted && resolvedTheme === 'dark';
  const items = [
    ...headerNavLinks.map((link) => ({ label: link.title, href: link.href })),
    {
      ariaLabel: 'Toggle Dark Mode',
      icon: dark ? <SunIcon /> : <MoonIcon />,
    },
  ];
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <DarkVeil color="#3b82f6" lightMode={resolvedTheme === 'light'} />
      </div>
      <SectionContainer>
        <div className="relative z-10 flex min-h-screen flex-col justify-between">
          <header className="relative z-20 mt-6 mb-4 flex items-center justify-center">
            <PillNav
              items={items}
              activeHref={activeHref}
              theme={mounted && resolvedTheme === 'light' ? 'light' : 'dark'}
              linkComponent={Link}
              itemStyle="pill"
              hoverEffect="fill"
              indicator="dot"
              surface="glass"
              onItemClick={(item) => {
                if (item.href) return;
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
              }}
            />
          </header>
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
      <BlobCursor
        material="chrome"
        color="#3B82F6"
        size={12}
        style={{ position: 'fixed', zIndex: 50 }}
      />
    </>
  );
};

export default LayoutWrapper;
