USE `Marktia`;

CREATE TABLE `address` (
                           `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `state` VARCHAR(45) NOT NULL,
                           `county` VARCHAR(45) NOT NULL,
                           `district` VARCHAR(45) NOT NULL,
                           `public_place` VARCHAR(45) NOT NULL,
                           `number` VARCHAR(15) NOT NULL
);

CREATE TABLE `user` (
                        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `name` VARCHAR(100) NOT NULL,
                        `email` VARCHAR(45) NOT NULL UNIQUE,
                        `password` VARCHAR(255) NOT NULL,
                        `cpf` VARCHAR(11) NOT NULL UNIQUE,
                        `cnpj` VARCHAR(14) UNIQUE,
                        `telephone` VARCHAR(15) NOT NULL,
                        `address_id` INT NOT NULL,
                        `role` INT NOT NULL,
                        `dt_creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
                        `dt_update` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
);

CREATE TABLE `service` (
                           `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `provider_id` INT NOT NULL,
                           `address_id` INT,
                           `title` VARCHAR(50) NOT NULL,
                           `type` INT NOT NULL,
                           `description` TEXT NOT NULL,
                           `price` DOUBLE PRECISION NOT NULL,
                           `picpay_user` VARCHAR(100) NOT NULL,
                           FOREIGN KEY (`provider_id`) REFERENCES `user` (`id`),
                           FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
);

CREATE TABLE `scheduling` (
                              `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                              `service_id` INT NOT NULL,
                              `consumer_id` INT NOT NULL,
                              `provider_id` INT NOT NULL,
                              `status` INT NOT NULL,
                              `dt_creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
                              `dt_completion` DATETIME,
                              FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
                              FOREIGN KEY (`consumer_id`) REFERENCES `user` (`id`),
                              FOREIGN KEY (`provider_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `evaluation` (
                              `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                              `scheduling_id` INT NOT NULL,
                              `rating` DECIMAL DEFAULT NULL,
                              `assessment` TEXT,
                              FOREIGN KEY (`scheduling_id`) REFERENCES `scheduling` (`id`)
);