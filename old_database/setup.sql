-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema examplardb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema examplardb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `examplardb` DEFAULT CHARACTER SET utf8 ;
USE `examplardb` ;

-- -----------------------------------------------------
-- Table `examplardb`.`university_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examplardb`.`university_table` (
  `university_id` INT UNSIGNED NOT NULL,
  `university_name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`university_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `examplardb`.`course_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examplardb`.`course_table` (
  `course_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `course_code` VARCHAR(45) NOT NULL,
  `course_name` VARCHAR(100) NOT NULL,
  `university_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`course_id`),
  INDEX `university_id_idx` (`university_id` ASC),
  CONSTRAINT `university_id`
    FOREIGN KEY (`university_id`)
    REFERENCES `examplardb`.`university_table` (`university_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `examplardb`.`exam_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examplardb`.`exam_table` (
  `exam_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `exam_year` SMALLINT NOT NULL,
  `exam_term` TINYINT NOT NULL,
  `course_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `course_id_idx` (`course_id` ASC),
  CONSTRAINT `course_id`
    FOREIGN KEY (`course_id`)
    REFERENCES `examplardb`.`course_table` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `examplardb`.`question_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examplardb`.`question_table` (
  `question_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_header` INT NOT NULL,
  `exam_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`question_id`),
  INDEX `exam_id_idx` (`exam_id` ASC),
  CONSTRAINT `exam_id`
    FOREIGN KEY (`exam_id`)
    REFERENCES `examplardb`.`exam_table` (`exam_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `examplardb`.`sub_question_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examplardb`.`sub_question_table` (
  `sub_question_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sub_question_number` VARCHAR(10) NOT NULL,
  `question_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`sub_question_id`),
  INDEX `question_id_idx` (`question_id` ASC),
  CONSTRAINT `question_id`
    FOREIGN KEY (`question_id`)
    REFERENCES `examplardb`.`question_table` (`question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `examplardb`.`solution_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `examplardb`.`solution_table` (
  `answer_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `answer_text` VARCHAR(500) NOT NULL,
  `answer_upvotes` INT NOT NULL,
  `sub_question_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`answer_id`),
  INDEX `sub_question_id_idx` (`sub_question_id` ASC),
  CONSTRAINT `sub_question_id`
    FOREIGN KEY (`sub_question_id`)
    REFERENCES `examplardb`.`sub_question_table` (`sub_question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
