-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2024 at 10:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cas`
--

-- --------------------------------------------------------

--
-- Table structure for table `master_table`
--

CREATE TABLE `master_table` (
  `master_id` int(11) NOT NULL,
  `master_user` int(11) NOT NULL,
  `master_form` int(11) NOT NULL,
  `master_applicant_data` int(11) NOT NULL,
  `master_file` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `master_table`
--
ALTER TABLE `master_table`
  ADD PRIMARY KEY (`master_id`),
  ADD KEY `master_user` (`master_user`),
  ADD KEY `master_form` (`master_form`),
  ADD KEY `master_applicant_data` (`master_applicant_data`),
  ADD KEY `master_file` (`master_file`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `master_table`
--
ALTER TABLE `master_table`
  MODIFY `master_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `master_table`
--
ALTER TABLE `master_table`
  ADD CONSTRAINT `master_table_ibfk_2` FOREIGN KEY (`master_form`) REFERENCES `formfields` (`formfields_id`),
  ADD CONSTRAINT `master_table_ibfk_3` FOREIGN KEY (`master_applicant_data`) REFERENCES `applicantdata` (`application_id`),
  ADD CONSTRAINT `master_table_ibfk_4` FOREIGN KEY (`master_file`) REFERENCES `file_uploads` (`file_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
