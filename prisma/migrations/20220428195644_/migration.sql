-- CreateTable
CREATE TABLE "Socials" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "postal_code" TEXT,
    "province" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Businesses" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "source" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "categories" TEXT[],
    "locationId" TEXT NOT NULL,
    "socialsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Businesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Businesses_socialsId_key" ON "Businesses"("socialsId");

-- CreateIndex
CREATE UNIQUE INDEX "Businesses_locationId_key" ON "Businesses"("locationId");

-- AddForeignKey
ALTER TABLE "Businesses" ADD CONSTRAINT "Businesses_socialsId_fkey" FOREIGN KEY ("socialsId") REFERENCES "Socials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Businesses" ADD CONSTRAINT "Businesses_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
