const stacks = [
  { name: 'Flutter', icons: ['flutter'] },
  { name: 'Dart', icons: ['dart'] },
  { name: 'Android Studio', icons: ['androidstudio'] },
  { name: 'PHP', icons: ['php'] },
  { name: 'Laravel', icons: ['laravel'] },
  { name: 'MySQL', icons: ['mysql'] },
  { name: 'Firebase', icons: ['firebase'] },
  { name: 'Git', icons: ['git'] },
  { name: 'Node.js', icons: ['nodejs'] },
  { name: 'Docker', icons: ['docker'] },
  { name: 'Linux', icons: ['linux'] },
  { name: 'Cloudflare', icons: ['cloudflare'] },
  { name: 'VPS', icons: ['vps'] },
  { name: 'DevOps', icons: ['devops'] },
  { name: 'Tailwind CSS + React', icons: ['tailwind', 'react'] },
  { name: 'Astro + HTML + CSS', icons: ['astro', 'html5', 'css3'] },
  { name: 'Photoshop', icons: ['photoshop'] },
  { name: 'Premiere Pro', icons: ['premierepro'] },
];

function StackIcon({ name }) {
  return (
    <img
      src={`/static/icons/stacks/${name}.svg`}
      alt=""
      width={24}
      height={24}
      className="h-6 w-6 shrink-0 object-contain"
    />
  );
}

export default function TechStack() {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Tech Stack
      </h2>
      <ul className="flex flex-wrap gap-3">
        {stacks.map((stack) => (
          <li key={stack.name}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-zinc-50 py-2 pl-3 pr-4 text-sm font-medium text-zinc-800 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
              <span className="inline-flex items-center gap-1.5">
                {stack.icons.map((icon) => (
                  <StackIcon key={icon} name={icon} />
                ))}
              </span>
              {stack.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
