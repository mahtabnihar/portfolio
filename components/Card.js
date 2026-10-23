import { useTheme } from 'next-themes';
import Image from './Image';
import Link from './Link';
import SpotlightCard from './SpotlightCard';

const Card = ({ title, description, imgSrc, href, year, tags = [], index = 0 }) => {
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === 'light';
  const label = String(index + 1).padStart(2, '0');

  const body = (
    <>
      {imgSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            alt=""
            src={imgSrc}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="transition duration-700 ease-out group-hover:scale-[1.045]"
            priority={index === 0}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-[#111111]"
            aria-hidden="true"
          />
          <span className="absolute top-4 right-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-zinc-900 shadow-sm backdrop-blur-md">
            {label}
          </span>
        </div>
      )}
      <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-5 sm:px-6 sm:pb-6">
        <div className="min-w-0">
          {year && (
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              {year}
            </p>
          )}
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
          {tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span
          className="dark:border-white/15 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition duration-300 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white dark:bg-white/5 dark:text-white dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-zinc-900"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M5 15L15 5M15 5H7.5M15 5V12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </>
  );

  return (
    <div className="w-full rounded-[1.5rem] focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 focus-within:ring-offset-transparent">
      <SpotlightCard
        theme={light ? 'light' : 'dark'}
        spotlightColor={light ? '#0369a1' : '#7dd3fc'}
        intensity={light ? 0.2 : 0.28}
        spotlightSize={300}
        softness={0.8}
        borderGlow={0.9}
        proximity={120}
        ambient
        grain={0.16}
        style={{ padding: 0 }}
        className="transition-transform duration-500 hover:-translate-y-0.5"
      >
        {href ? (
          <Link href={href} className="group block focus:outline-none">
            {body}
          </Link>
        ) : (
          <div className="group">{body}</div>
        )}
      </SpotlightCard>
    </div>
  );
};

export default Card;
