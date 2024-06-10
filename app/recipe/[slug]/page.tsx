import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

const RECIPE = {
  name: 'Kodak Portra 400',
  sampleImages: [
    'https://www.notion.so/image/https%3A%2F%2Ffujixweekly.files.wordpress.com%2F2020%2F12%2F50379690401_9cc787979a_c.jpg?id=cee39ac4-d785-48e3-af98-482ba308a3b9&table=block&spaceId=eb8b979e-aa32-43be-9730-b724cf5a171c&width=600&userId=fe16b854-aa6b-4dee-81d4-60b6a0e9741c&cache=v2',
    'https://www.notion.so/image/https%3A%2F%2Ffujixweekly.files.wordpress.com%2F2020%2F12%2F50370162841_972f76b9e7_c.jpg?id=cee39ac4-d785-48e3-af98-482ba308a3b9&table=block&spaceId=eb8b979e-aa32-43be-9730-b724cf5a171c&width=600&userId=fe16b854-aa6b-4dee-81d4-60b6a0e9741c&cache=v2',
    'https://www.notion.so/image/https%3A%2F%2Ffujixweekly.files.wordpress.com%2F2020%2F12%2F50370373776_14a7af6615_c.jpg?id=cee39ac4-d785-48e3-af98-482ba308a3b9&table=block&spaceId=eb8b979e-aa32-43be-9730-b724cf5a171c&width=600&userId=fe16b854-aa6b-4dee-81d4-60b6a0e9741c&cache=v2',
    'https://www.notion.so/image/https%3A%2F%2Ffujixweekly.files.wordpress.com%2F2020%2F12%2F50370350722_5b1e4fce46_c.jpg?id=cee39ac4-d785-48e3-af98-482ba308a3b9&table=block&spaceId=eb8b979e-aa32-43be-9730-b724cf5a171c&width=600&userId=fe16b854-aa6b-4dee-81d4-60b6a0e9741c&cache=v2',
  ],
  settings: {
    'Film Simulation': 'Classic Chrome',
    'Grain Effect': 'Strong; Small',
    'Color Chrome Effect': 'Strong',
    'Color Chrome FX Blue': 'Weak',
    'White Balance': '5200K',
    'Dynamic Range': 'DR400',
    Highlight: '0',
    Shadow: '-2',
    Color: '+2',
    Sharpness: '-2',
    'Noise Reduction': '-4',
    Clarity: '-2',
    ISO: 'Auto, up to ISO 6400',
    'Exposure Compensation': '+1/3 to +1 (typically)',
  },
};

export default function RecipePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
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
          {RECIPE.name}
        </h1>
      </div>

      {RECIPE.sampleImages.length > 0 && (
        <ul role="list" className="grid grid-cols-2 gap-2 sm:mb-8 sm:gap-3">
          {RECIPE.sampleImages.map((image, index) => (
            <li key={index} className="relative">
              <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded bg-zinc-100">
                <Image
                  src={image}
                  alt={`Sample image of ${RECIPE.name}`}
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
          {Object.entries(RECIPE.settings).map(([key, value]) => (
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
