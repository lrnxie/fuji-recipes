import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { getRecipeBySlug } from '@/lib/notion';
import { buttonVariants } from '@/components/ui/button';

export default async function RecipePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    redirect('/');
  }

  return (
    <div>
      <div className="-ml-4 mb-2 flex items-center gap-2">
        <Link
          href="/"
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <ChevronLeft className="size-5 text-zinc-800" />
        </Link>
        <h1 className="text-lg font-medium tracking-tight sm:text-xl">
          {recipe.name}
        </h1>
      </div>

      {recipe.sampleImages.length > 0 && (
        <ul role="list" className="grid grid-cols-2 gap-2 sm:mb-8 sm:gap-3">
          {recipe.sampleImages.map((image, index) => (
            <li key={index} className="relative">
              <div className="aspect-w-16 aspect-h-9 block w-full overflow-hidden rounded bg-zinc-100">
                <Image
                  src={image}
                  alt={`Sample image of ${recipe.name}`}
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 border-t border-zinc-200 pb-10">
        <dl className="divide-y divide-zinc-200">
          {Object.entries(recipe.settings).map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-2 gap-4 py-3.5 sm:grid-cols-3 sm:py-4"
            >
              <dt className="text-sm text-zinc-500">{key}</dt>
              <dd className="text-sm font-medium text-zinc-900 sm:col-span-2">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
