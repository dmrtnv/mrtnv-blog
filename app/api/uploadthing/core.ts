import { verifyAccess } from '@/lib/jwt';
import { UserCookieType } from '@/types/UserCookie';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import prisma from '@/lib/prisma';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profilePictureUploader: f({ image: { maxFileSize: '8MB', maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const authToken = req.cookies.get('auth')?.value;

      if (!authToken) throw new Error('unauthenticated');

      const user: UserCookieType = (await verifyAccess(authToken)) as unknown as UserCookieType;

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const userIdentifiers = metadata.user;

      try {
        const user = await prisma.user.update({
          where: { id: userIdentifiers.id },
          data: {
            profilePictureUrl: file.url,
          },
        });

        return { user };
      } catch (err: unknown) {
        console.log((err as Error).message);
        return;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
