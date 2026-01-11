-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2026 at 05:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Chati`
--

-- --------------------------------------------------------

--
-- Table structure for table `Chats`
--

CREATE TABLE `Chats` (
  `Chatname` varchar(255) NOT NULL,
  `ChatMan` int(255) NOT NULL,
  `Chatmember` int(255) NOT NULL,
  `Chatid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Chats`
--

INSERT INTO `Chats` (`Chatname`, `ChatMan`, `Chatmember`, `Chatid`) VALUES
('Anas mallouh', 28102, 28102, 1),
('Anas mallouh', 28102, 28102, 2),
('Anas mallouh', 76422, 28102, 3);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(255) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `username`) VALUES
(1, 22, 'AML'),
(3, 22, 'Anas');

-- --------------------------------------------------------

--
-- Table structure for table `msgs`
--

CREATE TABLE `msgs` (
  `sender` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `msgid` int(255) NOT NULL,
  `ChatID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msgs`
--

INSERT INTO `msgs` (`sender`, `content`, `msgid`, `ChatID`) VALUES
('28102', 'Anas', 1, 1),
('28102', 'Hello', 2, 1),
('28102', 'my name is anas', 3, 1),
('28102', 'Anas', 4, 3),
('28102', 'Anas', 5, 2),
('76422', 'Anas', 6, 3),
('76422', 'Mallouh', 7, 3),
('28102', 'yes', 8, 2),
('28102', 'YES', 9, 3),
('28102', 'anas', 10, 3),
('28102', 'asaddfawfawefwefwf', 11, 3),
('28102', 'wfwfew', 12, 3),
('28102', 'ef', 13, 3),
('76422', 'anas', 14, 3),
('28102', 'hello', 15, 3),
('28102', 'my name is anas', 16, 3),
('76422', 'hello anas', 17, 3);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `ID` int(255) NOT NULL,
  `RID` int(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `Text` varchar(255) NOT NULL,
  `Likes` int(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`ID`, `RID`, `username`, `title`, `Text`, `Likes`, `img`) VALUES
(22, 28102, 'Anas', 'Anas mallouh', 'Hala madred', 2, '1767881473761.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Posts_num` int(255) NOT NULL,
  `Followers` int(255) NOT NULL,
  `Following` int(255) NOT NULL,
  `ID` int(255) NOT NULL,
  `RID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `Email`, `password`, `Posts_num`, `Followers`, `Following`, `ID`, `RID`) VALUES
('Anas', 'a.mallouh522@gmail.com', '123', 1, 0, 0, 3, 28102),
('Aml', '123', '123', 0, 0, 0, 5, 76422);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Chats`
--
ALTER TABLE `Chats`
  ADD PRIMARY KEY (`Chatid`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `msgs`
--
ALTER TABLE `msgs`
  ADD PRIMARY KEY (`msgid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `RID` (`RID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Chats`
--
ALTER TABLE `Chats`
  MODIFY `Chatid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `msgs`
--
ALTER TABLE `msgs`
  MODIFY `msgid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
