-- MySQL dump 10.13  Distrib 8.0.23, for osx10.16 (x86_64)
--
-- Host: localhost    Database: PHONEDB
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `phn_info_tb`
--

DROP TABLE IF EXISTS `phn_info_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phn_info_tb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_name` char(50) DEFAULT NULL,
  `machine_name` char(50) NOT NULL,
  `shipping_price` int NOT NULL,
  `maker` char(50) NOT NULL,
  `created` date DEFAULT NULL,
  `battery` int DEFAULT NULL,
  `screen_size` double DEFAULT NULL,
  `storage` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `phn_info_idx` (`model_name`,`id`,`machine_name`,`shipping_price`,`maker`,`created`,`battery`,`screen_size`)
) ENGINE=InnoDB AUTO_INCREMENT=608 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phn_info_tb`
--

LOCK TABLES `phn_info_tb` WRITE;
/*!40000 ALTER TABLE `phn_info_tb` DISABLE KEYS */;
INSERT INTO `phn_info_tb` VALUES (2,'SM-N971','갤럭시 노트20',1199000,'samsung','2020-08-21',NULL,NULL,NULL),(3,'이것은 이거다.','갤럭시 노트20 울트라',1452000,'samsung','2020-08-21',NULL,NULL,NULL),(4,'SM-F916','Z폴드 2 5G',2398000,'samsung','2020-09-23',NULL,NULL,NULL),(5,'SM-F707','Z플립 2 5G',1650000,'samsung','2020-09-18',NULL,NULL,NULL),(8,'SM-G781','갤럭시 S20 울트라',1248500,'samsung','2020-02-12',NULL,NULL,NULL),(49,'IPHONE_11_128','아이폰 11 128GB',1056000,'apple','2019-10-25',NULL,NULL,NULL),(50,'123','123',123,'apple','1111-11-11',NULL,NULL,NULL),(52,'1123123312','2',3,'apple','1010-10-10',NULL,NULL,NULL),(53,'1123312','123123',31231,'lg','2010-10-12',NULL,NULL,NULL),(54,'123123','313',3,'lg','2010-10-10',NULL,NULL,NULL);
/*!40000 ALTER TABLE `phn_info_tb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-29 11:54:06
