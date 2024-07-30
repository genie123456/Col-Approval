-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 09:27 AM
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
-- Table structure for table `formfields`
--

CREATE TABLE `formfields` (
  `id` int(11) NOT NULL,
  `selectedDistrict` varchar(255) NOT NULL,
  `area` enum('rural','urban') NOT NULL,
  `body` enum('Corporation','Council','Jury') DEFAULT NULL,
  `choosingCorporation` varchar(255) DEFAULT NULL,
  `choosingCouncil` varchar(255) DEFAULT NULL,
  `choosingJury` varchar(255) DEFAULT NULL,
  `khasraIntegrated` enum('yes','no') NOT NULL,
  `integratedKhasraNumber` varchar(255) DEFAULT NULL,
  `office` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formfields`
--

INSERT INTO `formfields` (`id`, `selectedDistrict`, `area`, `body`, `choosingCorporation`, `choosingCouncil`, `choosingJury`, `khasraIntegrated`, `integratedKhasraNumber`, `office`, `created_at`) VALUES
(1, 'bilaspur', 'urban', 'Council', '', 'Ratanpur', '', 'yes', '400/1', 'Office of District Collectorate (DISTRICT - BILASPUR) - Rural/Urban', '2024-07-09 06:17:23'),
(2, 'durg', 'urban', 'Corporation', 'Bhilai', '', '', 'yes', '400/2', 'Office of District Collectorate (DISTRICT - DURG) - Rural/Urban', '2024-07-09 06:57:10'),
(3, 'raipur', 'urban', 'Jury', '', '', 'Kharora', 'yes', '400/3', 'Office of District Collectorate (DISTRICT - RAIPUR) - Rural/Urban', '2024-07-09 07:00:17'),
(8, 'dhamtari', 'urban', 'Council', '', '', '', 'yes', '400/4', 'Office of District Collectorate (DISTRICT - DHAMTARI) - Rural/Urban', '2024-07-23 12:39:55'),
(10, 'bastar', 'urban', 'Corporation', '', '', '', 'yes', '400/5', 'Office of District Collectorate (DISTRICT - BASTAR) - Rural/Urban', '2024-07-23 15:02:45'),
(11, 'balod', 'urban', 'Corporation', '', '', '', 'yes', '400/6', 'Office of District Collectorate (DISTRICT - BALOD) - Rural/Urban', '2024-07-27 06:00:44'),
(12, 'durg', 'urban', 'Corporation', 'Bhilai Charoda', '', '', 'yes', '400/8', 'Office of District Collectorate (DISTRICT - DURG) - Rural/Urban', '2024-07-30 07:18:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `formfields`
--
ALTER TABLE `formfields`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `formfields`
--
ALTER TABLE `formfields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
