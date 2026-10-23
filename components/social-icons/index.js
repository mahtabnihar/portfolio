import Mail from './mail.svg';
import Github from './github.svg';
import Facebook from './facebook.svg';
import Youtube from './youtube.svg';
import Linkedin from './linkedin.svg';
import Twitter from './twitter.svg';
import Instagram from './instagram.svg';
import Telegram from './telegram.svg';

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  telegram: Telegram,
};

const sizes = {
  5: 'h-5 w-5',
  6: 'h-6 w-6',
  8: 'h-8 w-8',
};

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 ${
          sizes[size] || 'h-8 w-8'
        }`}
      />
    </a>
  );
};

export default SocialIcon;
