import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/home');

  // return (
  //   <>
  //     <Link href='/home'>Home page</Link>
  //   </>
  // );
}
