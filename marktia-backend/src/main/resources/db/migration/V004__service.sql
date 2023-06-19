CREATE TABLE `service` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `provider_id` INT NOT NULL,
    `address_id` INT,
    `title` VARCHAR(50) NOT NULL,
    `type` INT NOT NULL,
    `description` TEXT NOT NULL,
    `price` DOUBLE PRECISION NOT NULL,
    `picpay_user` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`provider_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE
);

INSERT INTO `service` (provider_id, address_id, title, type, description, price, picpay_user)
VALUES (1, 1, 'Titulo 1', 0, 'Descricao 1', 99.00, 'f_azevedo');

INSERT INTO `service` (provider_id, address_id, title, type, description, price, picpay_user)
VALUES (2, 1, 'Titulo 2', 1, 'Descricao 2', 99.00, 'e_cussuol');