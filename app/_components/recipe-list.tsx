import Link from 'next/link';
import { getRecipeList } from '@/lib/notion';
import { cn } from '@/lib/utils';

export default async function RecipeList() {
  const recipeList = await getRecipeList();

  if (!recipeList || recipeList.length === 0) {
    return (
      <div className="mt-20">
        <h2 className="text-center text-zinc-500">No recipes</h2>
      </div>
    );
  }

  return (
    <ul className="mt-6 divide-y divide-zinc-100">
      {recipeList.map((recipe, index) => (
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
                  case 'yellow':
                    classes = 'bg-amber-100 text-amber-800';
                    break;
                  case 'blue':
                    classes = 'bg-sky-100 text-sky-800';
                    break;
                  case 'purple':
                    classes = 'bg-purple-100 text-purple-800';
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

              {recipe.customPreset && (
                <span className="inline-flex items-center rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-800">
                  {recipe.customPreset}
                </span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
