-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('Referral', 'Google', 'Facebook', 'Walk_in', 'Other');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'qualified', 'negotiating', 'closed');

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "source" "LeadSource" NOT NULL,
    "budgetInr" INTEGER,
    "location" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "inquiryDate" TIMESTAMP(3) NOT NULL,
    "message" TEXT,
    "status" "LeadStatus" NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");
