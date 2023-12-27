import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from '@/app/(auth)/SessionProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function UserDropdown() {
  const { user, axios, updateSession } = useSession();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await axios.get('/api/logout');

      updateSession();

      router.push('/');
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src='https://images.news18.com/ibnlive/uploads/2022/04/untitled-design-4.jpg' />
          <AvatarFallback>{user?.username[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mx-1'>
        <DropdownMenuLabel className='text-center'>@{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${user?.username}/manage`}>Manage account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className='hover:cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
