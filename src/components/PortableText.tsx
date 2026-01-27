import { PortableText as PortableTextComponent } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import type { PortableTextBlock } from '@portabletext/types';

interface PortableTextProps {
  content: PortableTextBlock[];
}

export const PortableText = ({ content }: PortableTextProps) => {
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="my-8 rounded-lg overflow-hidden">
            <img
              src={urlFor(value).width(800).url()}
              alt={value.alt || 'Imagem do post'}
              className="w-full h-auto"
            />
            {value.alt && (
              <p className="text-sm text-muted-foreground mt-2 text-center italic">
                {value.alt}
              </p>
            )}
          </div>
        );
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-bold text-foreground mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-semibold text-foreground mt-6 mb-3">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl font-semibold text-foreground mt-4 mb-2">{children}</h4>
      ),
      normal: ({ children }: any) => (
        <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-atos-gold pl-4 italic text-muted-foreground my-4">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="ml-4">{children}</li>
      ),
      number: ({ children }: any) => (
        <li className="ml-4">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic">{children}</em>
      ),
      link: ({ value, children }: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-atos-blue hover:text-atos-gold-dark underline"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-primary">
      <PortableTextComponent value={content} components={components} />
    </div>
  );
};


