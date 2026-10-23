import Link from './Link';
import siteMetadata from '@/data/siteMetadata';
import SocialIcon from '@/components/social-icons';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex max-w-full flex-wrap justify-center gap-x-4 gap-y-3">
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="5" />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size="5" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
          <SocialIcon kind="github" href={siteMetadata.github} size="5" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="5" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="5" />
          <SocialIcon kind="telegram" href={siteMetadata.telegram} size="5" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>{siteMetadata.author}</div>
        </div>
        <div className="mb-8 hidden flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 sm:flex">
          <Link
            className="hover:text-primary-600 hover:underline dark:hover:text-primary-600"
            href="/"
          >
            home
          </Link>
          <Link
            className="hover:text-primary-600 hover:underline dark:hover:text-primary-600"
            href="/blog"
          >
            notes
          </Link>
          <Link
            className="hover:text-primary-600 hover:underline dark:hover:text-primary-600"
            href="/projects"
          >
            projects
          </Link>
        </div>
      </div>
    </footer>
  );
}
