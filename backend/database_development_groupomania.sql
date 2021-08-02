-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 02, 2021 at 01:11 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_development_groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `messageId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `messageId`, `username`, `content`, `createdAt`, `updatedAt`) VALUES
(16, 1, 12, 'Eddy', 'Bonjour Yoan', '2021-07-30 21:41:36', '2021-07-30 21:41:36'),
(17, 3, 13, 'Pablo', 'Salut Eddy', '2021-07-30 21:55:07', '2021-07-30 21:55:07'),
(18, 4, 13, 'Hector', 'Salut eddy', '2021-07-30 22:02:54', '2021-07-30 22:02:54'),
(19, 4, 12, 'Hector', 'Enchanté Yoan le photographe', '2021-07-30 22:03:37', '2021-07-30 22:03:37');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `userId`, `title`, `content`, `attachment`, `likes`, `createdAt`, `updatedAt`) VALUES
(12, 2, 'Bonjour', 'Je suis photographe', 'http://localhost:8080/images/bkg.jpg1627680607699.jpg', 0, '2021-07-30 21:30:07', '2021-07-30 21:30:07'),
(13, 1, 'Bonjour a Tous', 'C\'est moi l\'administrateur', '0', 0, '2021-07-30 21:43:00', '2021-07-30 21:43:00');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210625143508-create-user.js'),
('20210625143809-create-message.js'),
('20210720214656-create-comments.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'eddy@gmail.com', 'Eddy', '$2b$05$KN4InXng8N41Wh4yicoonutGj2f.0OJ/cvc0aVUyvmGyxvWdXVBXy', 'Administrateur en Chef', 1, '2021-07-25 16:18:10', '2021-07-25 16:18:10'),
(2, 'yoan@gmail.com', 'Yoan', '$2b$05$EafswgTzzHvbQJeZgIy5teGxDyCpYJUlTS8hKnqrcraK9NxvlG29a', 'Photographe', 0, '2021-07-27 18:54:17', '2021-07-27 18:54:17'),
(3, 'Pablo@gmail.com', 'Pablo', '$2b$05$MziNpb8Xjp7VQORvjwHCSeSOWw5P8Cl0HgMi.GTAjWyt30V9zcdMq', 'Je suis Tenisman', 0, '2021-07-30 21:54:31', '2021-07-30 21:54:31'),
(4, 'Hector@gmail.com', 'Hector', '$2b$05$NxxCQXxUfm4wA0z/7QWLS./6r7VH.3xpK3Me2eSQu.DEBh9y9ua82', 'De passage', 0, '2021-07-30 22:01:25', '2021-07-31 21:12:21'),
(5, 'Albert@gmail.com', 'Albert', '$2b$05$HwIRBQPbk0S8VgQr3Ua.tuB7Tl5WbTrwOXNg8AnS7Rx3ne4AlOhOW', '', 0, '2021-08-01 20:13:14', '2021-08-01 21:18:25'),
(6, 'rene@gmail.com', 'René', '$2b$05$HVtCqBe1/CC7Txx72EOyM.xpV/pmf52NKGPgwSZDirF/05F1/YbFm', '', 0, '2021-08-01 21:31:57', '2021-08-01 21:31:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_ibfk_1` (`userId`),
  ADD KEY `comments_ibfk_2` (`messageId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_ibfk_1` (`userId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
