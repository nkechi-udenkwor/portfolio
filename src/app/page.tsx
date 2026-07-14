import { site } from '@/src/content/site';
import Link from 'next/link';

function isMailto(href: string) {
  return href.startsWith('mailto:');
}

function Arrow() {
  return (
    <span
      aria-hidden
      className='inline-block translate-y-px text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
    >
      ↗
    </span>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className='relative mx-auto max-w-xl px-6 pt-16 pb-10 sm:px-8'>
      <header>
        <div className='flex items-center justify-between gap-4'>
          <h1 className='text-lg font-medium tracking-tight text-foreground'>
            {site.name}
          </h1>
        </div>
        <p className='mt-1 text-sm text-muted'>
          {site.role}
          <span className='mx-1.5 text-border'>·</span>
          {/* {site.location} */}
        </p>

        <div className='mt-8 space-y-4 text-[15px] leading-relaxed text-foreground/90'>
          {site.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <main className='mb-20'>
        <section className='mt-16' aria-labelledby='projects-heading'>
          <h2
            id='projects-heading'
            className='mb-3 font-mono text-xs uppercase tracking-widest text-muted'
          >
            Selected Projects
          </h2>
          <ul className='-mx-3'>
            {site.projects.map((project) => (
              <li key={project.title}>
                <Link
                  href={project.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-baseline gap-4 rounded-lg px-3 py-5 transition-colors ease-in-out delay-100 hover:bg-surface'
                >
                  <div className='min-w-0 flex-1'>
                    <span className='flex items-center gap-1.5 text-base font-medium text-foreground transition-colors group-hover:text-accent'>
                      {project.title}
                      <Arrow />
                    </span>
                    <p className='mt-1 text-sm leading-relaxed text-muted'>
                      {project.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className='mt-16' aria-labelledby='contact-heading'>
          <h2
            id='contact-heading'
            className='mb-6 font-mono text-xs uppercase tracking-widest text-muted'
          >
            Elsewhere
          </h2>
          <nav aria-label='Social links'>
            <ul className='flex flex-wrap gap-x-6 gap-y-3'>
              {site.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={isMailto(link.href) ? undefined : '_blank'}
                    rel={
                      isMailto(link.href) ? undefined : 'noopener noreferrer'
                    }
                    className='text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
      {/* <div className='pb-5 pt-3'> */}
      <footer className='flex items-center justify-between mx-auto max-w-xl font-mono text-xs text-muted/70'>
        <span>© {year} Nkechi Udenkwor</span>
        <span>{site.footerNote}</span>
      </footer>
      {/* </div> */}
    </div>
  );
}
