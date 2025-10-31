-- CreateTable
CREATE TABLE "YouTubePlaylist" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubePlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTubePlaylist_playlistId_key" ON "YouTubePlaylist"("playlistId");
