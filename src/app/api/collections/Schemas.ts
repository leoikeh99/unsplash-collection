import { z } from "zod";

export const CreateCollectionSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
  })
  .strict();

export const AddPhotoSchema = z
  .object({
    unsplashId: z.string(),
    description: z.string().optional(),
    image: z.string(),
  })
  .strict();

export const RemovePhotoSchema = z
  .object({
    collectionId: z.string(),
    photoId: z.string(),
  })
  .strict();

export type CreateCollection = z.infer<typeof CreateCollectionSchema>;
export type AddPhoto = z.infer<typeof AddPhotoSchema>;
export type RemovePhoto = z.infer<typeof RemovePhotoSchema>;
