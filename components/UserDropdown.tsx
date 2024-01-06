import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from '@/contexts/SessionProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

function UserDropdown() {
  const { user } = useSession();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await axios.get('/api/logout');

      router.push('/');
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src='https://images.news18.com/ibnlive/uploads/2022/04/untitled-design-4.jpg' />
          <AvatarFallback>{user.fullName.split(' ').reduce((prev, current) => prev + current[0], '')}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mx-1'>
        <DropdownMenuItem className='flex justify-center hover:cursor-pointer' asChild>
          <Link className='font-semibold' href={`/${user.username}`}>
            @{user.username}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='hover:cursor-pointer' asChild>
          <Link href={`/profile`}>Manage account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className='hover:cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
