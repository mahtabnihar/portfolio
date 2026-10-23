import siteMetadata from '@/data/siteMetadata';
import projectsData from '@/data/projectsData';
import Card from '@/components/Card';
import { PageSEO } from '@/components/SEO';
import BlurText from '@/components/BlurText';

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="">
        <div className="space-y-2 pt-6 pb-4 md:space-y-5">
          <BlurText
            as="h1"
            text="Projects"
            effect="focus"
            animateBy="letters"
            direction="bottom"
            trigger="load"
            delay={40}
            blur={12}
            distance={16}
            className="on-ascii mb-1 text-3xl font-bold tracking-tight md:text-5xl"
          />
          <BlurText
            text="A selection of projects I worked on in the past few years."
            effect="drift"
            animateBy="words"
            direction="left"
            trigger="load"
            delay={45}
            blur={6}
            distance={14}
            className="on-ascii-muted text-lg leading-7"
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
      </div>
    </>
  );
}
