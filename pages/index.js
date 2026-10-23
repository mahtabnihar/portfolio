import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import Image from '@/components/Image';
import projectsData from '@/data/projectsData';
import Card from '@/components/Card';
import TechStack from '@/components/TechStack';
import ContactButtons from '@/components/ContactButtons';
import Booker from '@/components/Booker';
import BlurText from '@/components/BlurText';

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-y-2 pb-4 pt-6 md:space-y-5">
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col sm:pr-8">
            <BlurText
              as="h1"
              text={siteMetadata.author}
              effect="focus"
              animateBy="letters"
              direction="bottom"
              trigger="load"
              delay={35}
              stepDuration={0.45}
              blur={14}
              distance={18}
              className="on-ascii mb-1 font-display text-4xl font-normal leading-none tracking-normal md:text-6xl"
            />
            <BlurText
              as="h2"
              text="Founder of Sweez. I build software and the company around it."
              effect="blur"
              animateBy="words"
              direction="top"
              trigger="load"
              delay={70}
              stepDuration={0.35}
              blur={8}
              distance={16}
              className="on-ascii-muted mb-1 text-xl font-bold tracking-tight md:text-2xl"
            />
          </div>
          <div className="relative mb-8 mr-auto aspect-square h-28 w-28 shrink-0 overflow-hidden rounded-full shadow-md ring-2 ring-white dark:ring-white/30 sm:mb-0 sm:h-44 sm:w-44">
            <Image
              src="/static/images/myphoto.png"
              alt={siteMetadata.author}
              layout="fill"
              objectFit="cover"
              objectPosition="center 28%"
              className="origin-center scale-[1.65]"
              priority
            />
          </div>
        </div>
        <div className="on-ascii-muted space-y-4">
          <p className="my-4 leading-loose">
            I founded{' '}
            <a
              className="focusable on-ascii-link rounded-sm font-medium underline decoration-sky-700 decoration-2 underline-offset-2 transition duration-100 hover:text-sky-700 hover:decoration-sky-500/30 focus:text-orange-500 focus:ring-sky-500/40 dark:decoration-blue-400 dark:hover:text-blue-400 dark:hover:decoration-blue-400/30 dark:focus:text-blue-400 dark:focus:ring-blue-400/40"
              href="https://sweez.xyz"
              rel="noreferrer"
              target="_blank"
            >
              Sweez
            </a>{' '}
            in 2022. We build software for businesses that want to move faster: custom products,
            SaaS, and automation, from the first idea through launch. I work as founder and CEO,
            close to the product and the people we build it for.
          </p>
        </div>
        <ContactButtons />
        <TechStack />
      </div>
      <div className="content mt-10">
        <BlurText
          as="h2"
          text="Companies"
          effect="tilt"
          animateBy="letters"
          direction="left"
          trigger="view"
          delay={45}
          blur={8}
          distance={18}
          className="mb-2 text-xl font-bold text-zinc-800 dark:text-white"
        />
        <BlurText
          text="The company I founded and still run."
          effect="blur"
          animateBy="words"
          direction="bottom"
          trigger="view"
          delay={50}
          blur={6}
          distance={12}
          className="max-w-[46ch] leading-relaxed text-zinc-500 dark:text-slate-300"
        />
        <ul className="mt-8">
          <li className="dark:text-zinc-350 my-5 flex items-center gap-3 text-zinc-500 sm:gap-4">
            <a
              className="link focusable flex h-14 w-24 flex-none items-center justify-center overflow-hidden rounded-md bg-black px-2 sm:w-36"
              href="https://sweez.xyz"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/static/images/companies/sweez.png"
                alt="Sweez"
                width="128px"
                height="22px"
              />
            </a>
            <div className="flex min-w-0 flex-col justify-center">
              <p className="mb-1 flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-zinc-700 dark:text-zinc-100">Sweez</span>
                <span className="inline-block flex-none translate-y-px rounded bg-zinc-100 p-1 text-xs font-medium leading-none text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  2022
                  <span className="text-zinc-350 dark:text-zinc-550 mx-0.5">—</span>
                  Today
                </span>
              </p>
              <p className="text-zinc-500 dark:text-zinc-400">Founder & CEO</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="content mb-8 mt-12">
        <BlurText
          as="h2"
          text="Projects"
          effect="zoom"
          animateBy="letters"
          direction="bottom"
          trigger="view"
          delay={45}
          blur={8}
          distance={20}
          className="mb-2 text-xl font-bold text-zinc-800 dark:text-white"
        />
        <BlurText
          text="A selection of projects I worked on in the past few years."
          effect="drift"
          animateBy="words"
          direction="left"
          trigger="view"
          delay={40}
          blur={6}
          distance={14}
          className="max-w-[46ch] leading-relaxed text-zinc-500 dark:text-slate-300"
        />
      </div>
      <div className="flex flex-col gap-8 py-2">
        {projectsData.map((d, index) => (
          <Card
            key={d.title}
            index={index}
            title={d.title}
            description={d.description}
            imgSrc={d.imgSrc}
            href={d.href}
          />
        ))}
      </div>

      <section
        id="book"
        className="relative left-1/2 mt-20 w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2"
      >
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white">Book a call</h2>
        <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-zinc-500 dark:text-slate-300">
          A free 15-minute video call. Choose an open day, then a time. You’ll get a calendar
          invite, shown in your timezone.
        </p>
        <div className="mt-6">
          {siteMetadata.calLink ? <Booker calLink={siteMetadata.calLink} /> : null}
        </div>
      </section>
    </>
  );
}
