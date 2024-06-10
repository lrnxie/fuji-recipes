import Link from 'next/link';
import { cn } from '@/lib/utils';
import SearchInput from './_components/search-input';

const RECIPES = [
  {
    name: 'Kodak Potra 400',
    slug: 'Kodak-Potra-400',
    tags: [
      {
        name: 'warm',
        color: 'amber',
      },
    ],
    preset: 'C1',
  },
  {
    name: 'Fujicolor Superia 800',
    slug: 'Fujicolor-Superia-800',
    tags: [
      {
        name: 'cool',
        color: 'sky',
      },
    ],
    preset: 'C2',
  },
  {
    name: 'Cozy Chrome',
    slug: 'Cozy-Chrome',
    tags: [],
    preset: '',
  },
];

export default function Home() {
  return (
    <div>
      <SearchInput />

      <ul className="mt-6 divide-y divide-zinc-100">
        {RECIPES.map((recipe, index) => (
          <li key={index} className="py-4">
            <Link
              href={`/recipe/${recipe.slug}`}
              className="flex items-center space-x-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-900">
                  {recipe.name}
                </p>
              </div>
              <div className="space-x-2">
                {recipe.tags.map((tag, index) => {
                  let classes;
                  switch (tag.color) {
                    case 'amber':
                      classes = 'bg-amber-100 text-amber-800';
                      break;
                    case 'sky':
                      classes = 'bg-sky-100 text-sky-800';
                      break;
                    default:
                      classes = 'bg-zinc-100 text-zinc-800';
                  }

                  return (
                    <span
                      key={index}
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        classes
                      )}
                    >
                      {tag.name}
                    </span>
                  );
                })}

                {recipe.preset && (
                  <span className="inline-flex items-center rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-800">
                    {recipe.preset}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
