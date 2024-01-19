import Link from 'next/link';
import { Card, CardHeader, CardTitle } from './ui/card';

function CallToSignIn() {
  return (
    <Card className='my-2'>
      <CardHeader>
        <CardTitle className='text-center'>
          <Link href='/login' className='mr-2 text-sky-600 hover:underline'>
            Log In
          </Link>
          <span>to use MRTNV Blog!</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default CallToSignIn;
