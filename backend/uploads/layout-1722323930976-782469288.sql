-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2024 at 08:36 PM
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` int(10) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `type`, `email`, `phone_number`, `password`) VALUES
(1, 'ADM', 'official1', 'officer1@gmail.com', 1122334455, 'officer1'),
(12, 'Anshika', 'applicant', 'A@gmail.com', 2147483647, 'anshika'),
(5, 'applicant1', 'applicant', 'applicant1@gmail.com', 1234567890, 'applicant1'),
(11, 'applicant2', 'applicant', 'applicant2@gmail.com', 2147483647, 'applicant2'),
(4, 'Dep-Dir', 'official4', 'officer4@gmail.com', 2147483647, 'officer4'),
(2, 'ExecEng', 'official2', 'officer2@gmail.com', 2147483647, 'officer2'),
(10, 'indresh', 'applicant', 'pv11@gmail.com', 2147483647, 'indresh'),
(8, 'nikhil', 'applicant', 'nikhil@gmail.com', 2147483647, 'nikhil'),
(7, 'pankaj', 'applicant', 'pv14720@gmail.com', 2147483647, 'pankaj'),
(6, 'RishiRai', 'applicant', 'rishirai@gmail.com', 2147483647, 'rishirai'),
(3, 'SDM', 'official3', 'officer3@gmail.com', 2147483647, 'officer3'),
(9, 'vishesh', 'applicant', 'vishesh@gmail.com', 2147483647, 'vishesh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
