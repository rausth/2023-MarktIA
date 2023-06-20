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
    `image_url` TEXT,
    FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
);

INSERT INTO `user` (name, email, password, cpf, telephone, address_id, role, image_url)
VALUES ('Fernando', 'fernando@gmail.com', '123456', '11111111111', '27998278371', 1, 1, 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png');

INSERT INTO `user` (name, email, password, cpf, telephone, address_id, role, image_url)
VALUES ('Enzo', 'enzo@gmail.com', '123456', '11111111112', '27998278371', 2, 1, 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png');