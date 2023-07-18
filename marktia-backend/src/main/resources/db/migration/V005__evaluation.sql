CREATE TABLE `evaluation` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `scheduling_id` INT NOT NULL,
    `rating` DECIMAL NOT NULL,
    `assessment` TEXT,
    FOREIGN KEY (`scheduling_id`) REFERENCES `scheduling` (`id`) ON DELETE CASCADE
);

INSERT INTO `evaluation` (scheduling_id, rating, assessment)
VALUES (1, 10, 'Muito bom o serviço prestado');