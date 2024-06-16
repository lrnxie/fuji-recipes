import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  async function search(formData: FormData) {
    'use server';

    const query = formData.get('search');

    redirect(!query || query === '' ? '/' : `/?q=${query.toString().trim()}`);
  }

  return (
    <form action={search} className="mx-auto max-w-md">
      <Input name="search" type="text" placeholder="Search" />
    </form>
  );
}
