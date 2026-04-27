/*
  Warnings:

  - The values [MAGEZINE] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('BOOK', 'MAGAZINE', 'DVD');
ALTER TABLE "media" ALTER COLUMN "mediaType" TYPE "Type_new" USING ("mediaType"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "public"."Type_old";
COMMIT;
