CREATE TABLE `producer`.`users` (
	`id` INT NOT NULL AUTO_INCREMENT,  
	`firstname` VARCHAR(255) NOT NULL, 
    `lastname` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL, 
	PRIMARY KEY (`id`)
) ENGINE = InnoDB;