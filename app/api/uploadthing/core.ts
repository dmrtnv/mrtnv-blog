import { verifyAccess } from '@/lib/jwt';
import { UserCookieType } from '@/types/UserCookie';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import db from '@/lib/db';
import { UTApi } from 'uploadthing/server';

export const utapi = new UTApi();

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
        const { profilePictureUrl: oldProfilePictureUrl } = (await db.user.findFirst({
          where: { id: userIdentifiers.id },
          select: { profilePictureUrl: true },
        })) ?? { profilePictureUrl: null };

        const user = await db.user.update({
          where: { id: userIdentifiers.id },
          data: {
            profilePictureUrl: file.url,
          },
        });

        if (oldProfilePictureUrl) {
          await utapi.deleteFiles(oldProfilePictureUrl.slice(oldProfilePictureUrl.lastIndexOf('/') + 1));
        }

        return { user };
      } catch (err: unknown) {
        console.log((err as Error).message);
        return;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
