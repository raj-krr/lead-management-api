/*
  Warnings:

  - The values [Walk_in] on the enum `LeadSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeadSource_new" AS ENUM ('Referral', 'Google', 'Facebook', 'WalkIn', 'Other');
ALTER TABLE "Lead" ALTER COLUMN "source" TYPE "LeadSource_new" USING ("source"::text::"LeadSource_new");
ALTER TYPE "LeadSource" RENAME TO "LeadSource_old";
ALTER TYPE "LeadSource_new" RENAME TO "LeadSource";
DROP TYPE "public"."LeadSource_old";
COMMIT;
