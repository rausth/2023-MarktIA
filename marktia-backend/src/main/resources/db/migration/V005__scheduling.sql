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

INSERT INTO `scheduling` (service_id, consumer_id, provider_id, status)
VALUES (2, 1, 2, 0);