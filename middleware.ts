import { NextRequest, NextResponse } from 'next/server';
import { verifyAccess } from '@/lib/jwt';

type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestType = {
  methods: MethodType[];
  href: string;
};

const RequestsToAuthorize: RequestType[] = [
  {
    methods: ['GET'],
    href: '/api/logout',
  },
  {
    methods: ['POST', 'DELETE'],
    href: '/api/posts',
  },
  {
    methods: ['GET', 'DELETE'],
    href: '/api/me',
  },
  {
    methods: ['DELETE', 'PUT'],
    href: '/api/users',
  },
  {
    methods: ['POST'],
    href: '/api/comments',
  },
];

function verifyRequest(req: NextRequest) {
  return RequestsToAuthorize.some(
    (request) => req.nextUrl.href.includes(request.href) && request.methods.includes(req.method as MethodType),
  );
}

// const RequestsToAuthorize = ['/api/logout', '/api/posts', '/api/posts/:id+', '/api/users/:username+', '/api/me'];

export async function middleware(req: NextRequest) {
  if (verifyRequest(req)) {
    const authToken = req.cookies.get('auth')?.value;

    if (!authToken) return NextResponse.json({ session: { status: 'unauthenticated' } }, { status: 401 });

    const data = await verifyAccess(authToken);

    try {
      if (!data) throw new Error('Token has no data');

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('user-data', JSON.stringify({ id: data.id, username: data.username }));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err: unknown) {
      return NextResponse.json({ session: { status: 'unauthenticated' } }, { status: 401 });
    }
  }
}
