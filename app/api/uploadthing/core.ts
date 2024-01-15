import { verifyAccess } from '@/lib/jwt';
import { UserCookieType } from '@/types/UserCookie';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import db from '@/lib/db';
import { UTApi } from 'uploadthing/server';
import lqip from 'lqip-modern';

const utapi = new UTApi();

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
        const parsedImage = await parseImage(file.url);

        const oldProfilePicture = await db.profilePicture.findFirst({ where: { userId: userIdentifiers.id } });

        const newProfilePicture = await db.profilePicture.upsert({
          where: { userId: userIdentifiers.id },
          update: {
            fileKey: file.key,
            ...parsedImage,
          },
          create: {
            userId: userIdentifiers.id,
            fileKey: file.key,
            ...parsedImage,
          },
        });

        if (oldProfilePicture) {
          await utapi.deleteFiles(oldProfilePicture.fileKey);
        }

        return { newProfilePicture };
      } catch (err: unknown) {
        console.log((err as Error).message);
        return;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

async function parseImage(url: string) {
  const imageData = await fetch(url);
  const arrayBufferImage = await imageData.arrayBuffer();
  const lqipImage = await lqip(Buffer.from(arrayBufferImage));

  return {
    height: lqipImage.metadata.originalHeight,
    width: lqipImage.metadata.originalWidth,
    src: url,
    blurDataUrl: lqipImage.metadata.dataURIBase64,
  };
}
