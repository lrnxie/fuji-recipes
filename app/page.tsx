import SearchInput from './_components/search-input';
import RecipeList from './_components/recipe-list';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { q: query } = searchParams;

  return (
    <div>
      <SearchInput />
      <RecipeList query={query ?? ''} />
    </div>
  );
}
