-- AlterTable
-- Les colonnes de texte long étaient en VARCHAR(191), ce qui provoquait
-- une erreur MySQL (et une réponse 500) dès que le contenu dépassait 191 caractères.
ALTER TABLE `Project`
    MODIFY `objective` TEXT NOT NULL,
    MODIFY `methodology` TEXT NOT NULL,
    MODIFY `results` TEXT NOT NULL,
    MODIFY `testimonial` TEXT NULL;

-- AlterTable
ALTER TABLE `ContactMessage`
    MODIFY `message` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `QuoteRequest`
    MODIFY `description` TEXT NOT NULL,
    MODIFY `status` VARCHAR(50) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `NewsItem`
    MODIFY `description` TEXT NOT NULL;
