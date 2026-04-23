-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'EMPLOYEE', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CHECKEDOUT', 'AVAILABLE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('BOOK', 'MAGEZINE', 'DVD');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" SERIAL NOT NULL,
    "checkout_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_copies" (
    "loanId" INTEGER NOT NULL,
    "copyId" INTEGER NOT NULL,

    CONSTRAINT "loan_copies_pkey" PRIMARY KEY ("loanId","copyId")
);

-- CreateTable
CREATE TABLE "media_copies" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "copy_number" INTEGER NOT NULL,
    "currentStatus" "Status" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "media_copies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "mediaType" "Type" NOT NULL,
    "publication_year" TIMESTAMP(3),
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_copies" ADD CONSTRAINT "loan_copies_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_copies" ADD CONSTRAINT "loan_copies_copyId_fkey" FOREIGN KEY ("copyId") REFERENCES "media_copies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_copies" ADD CONSTRAINT "media_copies_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
