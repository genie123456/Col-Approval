-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 12:58 PM
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
-- Table structure for table `applicantdata`
--

CREATE TABLE `applicantdata` (
  `application_id` int(11) NOT NULL,
  `formId` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `LUB` varchar(255) DEFAULT NULL,
  `Srno` varchar(50) DEFAULT NULL,
  `registrationDate` date DEFAULT NULL,
  `Hno` varchar(50) DEFAULT NULL,
  `neighbourhoodColony` varchar(255) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `surveyNumber` varchar(50) DEFAULT NULL,
  `land_area` varchar(50) DEFAULT NULL,
  `village` varchar(255) DEFAULT NULL,
  `neighbourhoodColony4` varchar(255) DEFAULT NULL,
  `district4` varchar(50) DEFAULT NULL,
  `developedLandName` varchar(255) DEFAULT NULL,
  `village5` varchar(255) DEFAULT NULL,
  `neighbourhoodColony5` varchar(255) DEFAULT NULL,
  `district5` varchar(50) DEFAULT NULL,
  `relinquishment` enum('yes','no') DEFAULT NULL,
  `permitPurpose` varchar(255) DEFAULT NULL,
  `mobileNumber` char(10) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  `tinGstnNumber` char(15) DEFAULT NULL,
  `EWS` enum('proposed layout is less than one acre','proposed layout is one acre or more') DEFAULT NULL,
  `EWS_Less` enum('Payment of Land','Plot') DEFAULT NULL,
  `outside_res_area` enum('Yes','No') DEFAULT NULL,
  `inside_res_area` enum('Yes','No') DEFAULT NULL,
  `CGR_Residential_Area` varchar(50) DEFAULT NULL,
  `CGR_Land_Area` varchar(50) DEFAULT NULL,
  `EWS_Residential_Area` varchar(50) DEFAULT NULL,
  `EWS_Land_Area` varchar(50) DEFAULT NULL,
  `CGRAmount` varchar(50) DEFAULT NULL,
  `clearancePWD` tinyint(1) DEFAULT NULL,
  `clearanceWRD` tinyint(1) DEFAULT NULL,
  `clearanceCSEB` tinyint(1) DEFAULT NULL,
  `clearanceCECB` tinyint(1) DEFAULT NULL,
  `clearanceNHAI` tinyint(1) DEFAULT NULL,
  `clearancePHED` tinyint(1) DEFAULT NULL,
  `clearancePMGSY` tinyint(1) DEFAULT NULL,
  `clearanceFOREST` tinyint(1) DEFAULT NULL,
  `clearanceFireNOC` tinyint(1) DEFAULT NULL,
  `clearanceGramPanchayat` tinyint(1) DEFAULT NULL,
  `clearanceNNNPTP` tinyint(1) DEFAULT NULL,
  `clearanceRevenue` tinyint(1) DEFAULT NULL,
  `clearanceRES` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicantdata`
--

INSERT INTO `applicantdata` (`application_id`, `formId`, `username`, `fullName`, `LUB`, `Srno`, `registrationDate`, `Hno`, `neighbourhoodColony`, `district`, `surveyNumber`, `land_area`, `village`, `neighbourhoodColony4`, `district4`, `developedLandName`, `village5`, `neighbourhoodColony5`, `district5`, `relinquishment`, `permitPurpose`, `mobileNumber`, `email`, `tinGstnNumber`, `EWS`, `EWS_Less`, `outside_res_area`, `inside_res_area`, `CGR_Residential_Area`, `CGR_Land_Area`, `EWS_Residential_Area`, `EWS_Land_Area`, `CGRAmount`, `clearancePWD`, `clearanceWRD`, `clearanceCSEB`, `clearanceCECB`, `clearanceNHAI`, `clearancePHED`, `clearancePMGSY`, `clearanceFOREST`, `clearanceFireNOC`, `clearanceGramPanchayat`, `clearanceNNNPTP`, `clearanceRevenue`, `clearanceRES`) VALUES
(1, 1, 'pankaj', 'Applicant 1', 'Municipal Council', '12345', '2024-07-02', '123456', 'Sector 1', 'bilaspur', '1234567', '1000', 'village 1', 'Colony 1', 'bilaspur', 'Bhoomi', 'Takhatpur', 'Takhatpur Colony', 'bilaspur', 'yes', 'corporate', '9087654321', 'pv11@gmail.com', '123456789098765', 'proposed layout is one acre or more', NULL, 'Yes', 'Yes', '9', '8', '7', '6', '9000', 1, 1, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 'vishesh', 'Applicant 2', 'Corporation', '54321', '2024-07-03', '234567', 'Sector 2', 'durg', '98765', '2000', 'village 2', 'Colony 2', 'durg', 'Bhoomi 1', 'Bhilai', 'Colony 1', 'durg', 'yes', 'plotted', '9988776655', 'pv22@gmail.com', '123456789098755', 'proposed layout is less than one acre', 'Payment of Land', '', '', '', '', '', '', '', 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 3, 'nikhil', 'Applicant 3', 'Municipal Jury', '223344', '2024-07-04', '445566', 'Sector 3', 'raipur', '889900', '3000', 'Village 2', 'Colony 2', 'durg', 'Bhoomi 2', 'Kharora', 'Colony 2', 'surajpur', 'no', 'plotted_corporate', '7788990066', 'pv33@gmail.com', '778899006655443', 'proposed layout is less than one acre', 'Plot', '', '', '', '', '', '', '', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 8, 'applicant1', 'XYZ', 'Council', '456789', '2024-07-01', '4444', 'Street 4', 'durg', '888', NULL, 'Village 4', 'Sector 4', 'balod', 'Something', 'Village 4', 'Colony 4', 'bastar', 'yes', 'plotted', '7788996655', 'v14@gmail.com', '667788990055667', 'proposed layout is one acre or more', '', '', 'Yes', '5', '6', '7', '8', '900', 1, 1, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 10, 'applicant2', 'Apllicant 5', 'Corporation', '11', '2024-07-10', '333', 'hhhh', 'gariaband', '555', NULL, 'vvvv', 'ccccc', '', 'some', 'vvv', 'nnnnnn', 'bilaspur', 'no', 'plotted_corporate', '9944556677', 'p222@gmail.com', '223344556677889', 'proposed layout is less than one acre', '', '', '', '', '', '', '', '', 1, NULL, 1, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 11, 'indresh', 'Applicant yy', 'Corporation', '2222', '2024-07-17', '22222', 'co', 'bemetara', '444', NULL, 'vvv', 'bbb', 'dakshin bastar dantewada', '333', '555', 'ffff', 'balrampur - ramanujganj', '', 'corporate', '8899889988', 'p@gmail.com', '112233445566778', 'proposed layout is less than one acre', '', '', '', '', '', '', '', '', 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 12, NULL, 'Applicant 8', 'Corporation', '1122', '2024-07-17', '1111', ' Ne 1', 'bemetara', '22', NULL, 'v 8', 'n 8', 'balrampur - ramanujganj', 'store', 'v 88', 'n 88', 'janjgir-champa', 'yes', 'plotted', '9898989898', 'pv@gmail.com', '223344556677889', 'proposed layout is one acre or more', '', 'Yes', 'Yes', '6', '7', '8', '9', '50000', NULL, 1, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 13, NULL, 'Applicant 3', '', '', '0000-00-00', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '', '9900990099', 'pv@gmail.com', '334455667788990', 'proposed layout is less than one acre', '', '', '', '', '', '', '', '', 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicantdata`
--
ALTER TABLE `applicantdata`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `formId` (`formId`),
  ADD KEY `fk_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicantdata`
--
ALTER TABLE `applicantdata`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applicantdata`
--
ALTER TABLE `applicantdata`
  ADD CONSTRAINT `applicantdata_ibfk_1` FOREIGN KEY (`formId`) REFERENCES `formfields` (`id`),
  ADD CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
