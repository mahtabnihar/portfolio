import { useTheme } from 'next-themes';
import siteMetadata from '@/data/siteMetadata';
import SpecularButton from './SpecularButton';
import Facebook from './social-icons/facebook.svg';
import Instagram from './social-icons/instagram.svg';
import Twitter from './social-icons/twitter.svg';
import Github from './social-icons/github.svg';
import Linkedin from './social-icons/linkedin.svg';
import Mail from './social-icons/mail.svg';
import Youtube from './social-icons/youtube.svg';
import Telegram from './social-icons/telegram.svg';

const contacts = [
  { name: 'Facebook', href: siteMetadata.facebook, Icon: Facebook, external: true },
  { name: 'Instagram', href: siteMetadata.instagram, Icon: Instagram, external: true },
  { name: 'Twitter', href: siteMetadata.twitter, Icon: Twitter, external: true },
  { name: 'GitHub', href: siteMetadata.github, Icon: Github, external: true },
  { name: 'LinkedIn', href: siteMetadata.linkedin, Icon: Linkedin, external: true },
  {
    name: 'Email',
    href: siteMetadata.email ? `mailto:${siteMetadata.email}` : '',
    Icon: Mail,
    external: false,
  },
  { name: 'YouTube', href: siteMetadata.youtube, Icon: Youtube, external: true },
  { name: 'Telegram', href: siteMetadata.telegram, Icon: Telegram, external: true },
];

export default function ContactButtons() {
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === 'light';

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {contacts
        .filter((contact) => contact.href)
        .map(({ name, href, Icon, external }) => (
          <SpecularButton
            key={name}
            href={href}
            size="sm"
            radius={999}
            tint={light ? '#111111' : '#ffffff'}
            tintOpacity={0.08}
            blur={10}
            textColor={light ? '#171717' : '#f5f5f5'}
            lineColor={light ? '#171717' : '#ffffff'}
            baseColor={light ? '#a3a3a3' : '#525252'}
            intensity={1}
            idleIntensity={0.35}
            shineSize={10}
            shineFade={34}
            thickness={1.2}
            glow={1}
            followMouse
            proximity={220}
            {...(external ? { rel: 'noreferrer', target: '_blank' } : {})}
          >
            <Icon className="h-4 w-4 fill-current" role="presentation" />
            {name}
          </SpecularButton>
        ))}
    </div>
  );
}
