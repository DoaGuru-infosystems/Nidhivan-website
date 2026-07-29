-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2026 at 09:59 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ayushi_construction`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `meta_description` varchar(160) DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `published_date` varchar(100) NOT NULL,
  `updated_date` varchar(100) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `meta_title`, `slug`, `content`, `image_url`, `meta_description`, `meta_keywords`, `published_date`, `updated_date`, `is_published`) VALUES
(1, '@ test blof', '', 'test-blof', '<h1>sfksjfkskjfjskjkok<br><h2>sdgsdfgfgsdfgsdfgsdf<br><h3>dxdfgdfgdfghdfdfgbd<br><h4><a href=\"https://www.apachefriends.org/\">dfdfgdfgdfgvbdfbd</a><br><h5>sfgsdfgdsgdfg<br><h6>sdfnskfnksngn<br><br></h6></h5></h4></h3></h2></h1>', '1776857966743-408791533.png', 'adcakjnjafjaj', 'sadfasdfkcafkcoakolkk,', '2026-04-22 17:09:26', '2026-04-22 18:44:40', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `mobile_no`, `subject`, `address`, `message`, `created_date`) VALUES
(17, 'sharad jabalpur shau', 'sharad1986sahu@gamil.com', '1234561231', 'Query', '3004 Garha', 'dd', '2025-04-01 11:16:04'),
(18, 'testapi', 'testapi@gmail.com', '3456782345', 'Query', 'Ayushi Construction, Infront of Garha Thana, Tripuri Chowk, Jabalpur, Madhya Pradesh 482002', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has su', '2025-03-05 06:13:02'),
(20, 'test of excel download', 'teste@gmail.com', '4546656526', 'Query', 'we', 'ew', '2025-04-02 12:37:32'),
(21, 'asdas', 'sdasd@gmail.com', '7645678678', 'Query', 'sijlks', 'askljd daskldj alksdja sd', '2025-04-15 08:59:17'),
(22, 'Nitin Dadwal', 'sprainfra2025@gmail.com', '8882701635', 'Query', 'Gujarat Dholera', '???? Hi, \nSPRA Infra — sister company of HIFLY INFRA, one of the leading real estate firms in the market.\n\nWe deal in Residential, Commercial & Farmhouse lands across India with complete transparency — no over-promotion, just the real picture.\n\nOur sold-o', '2025-11-07 05:48:17');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_categories`
--

CREATE TABLE `gallery_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `thumbnail_image` varchar(500) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gallery_categories`
--

INSERT INTO `gallery_categories` (`id`, `title`, `thumbnail_image`, `created_at`, `updated_at`) VALUES
(1, 'Travel', 'thumbnail_image-1776763766076-647487964.png', '2026-04-21T09:19:34.209Z', '2026-04-21T09:29:26.083Z');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

CREATE TABLE `gallery_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gallery_images`
--

INSERT INTO `gallery_images` (`id`, `category_id`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'images-1776934704863-691835146.jpg', '2026-04-23 14:28:24', '2026-04-23 14:28:24'),
(2, 1, 'images-1776934704863-89215305.avif', '2026-04-23 14:28:24', '2026-04-23 14:28:24'),
(3, 1, 'images-1776934704863-739010108.jpg', '2026-04-23 14:28:24', '2026-04-23 14:28:24');

-- --------------------------------------------------------

--
-- Table structure for table `otpcollections`
--

CREATE TABLE `otpcollections` (
  `otp_id` int(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `code` int(10) DEFAULT NULL,
  `expiresIn` int(20) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otpcollections`
--

INSERT INTO `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`) VALUES
(1, 'kuldeepdoauruinfosystems@gmail.com', 224603, NULL, '2024-08-13 06:59:36.777227'),
(2, 'mohitsahu1993@gmail.com', 254910, NULL, '2024-08-22 07:31:13.481316'),
(3, 'shadab@gmail.com', 617412, NULL, '2024-09-02 07:06:14.109336'),
(4, 'kuldeepdoauruinfosystems@gmail.com', 694511, NULL, '2024-10-28 06:46:34.286922'),
(5, 'umer@gmail.com', 141174, NULL, '2024-10-28 09:38:09.772837'),
(6, 'umerqureshidoaguru@gmail.com', 284783, NULL, '2024-10-28 09:40:56.211954'),
(7, 'umerqureshi786786@gmail.com', 438900, NULL, '2024-10-28 10:06:47.009743'),
(8, 'umerqureshi786786@gmail.com', 766856, NULL, '2024-10-28 10:36:44.825756'),
(9, 'umerqureshi786786@gmail.com', 91347, NULL, '2024-10-28 10:42:44.327534'),
(10, 'umerqureshidoaguru@gmail.com', 965997, NULL, '2024-10-28 11:01:44.891003'),
(11, 'umerqureshi786786@gmail.com', 214866, NULL, '2024-10-28 11:06:44.496840'),
(12, 'umerqureshidoaguru@gmail.com', 595652, NULL, '2024-10-28 11:10:16.926784'),
(13, 'umerqureshi786786@gmail.com', 916447, NULL, '2024-10-28 11:48:37.518558'),
(14, 'umerqureshidoaguru@gmail.com', 164218, NULL, '2024-11-02 08:29:38.226751'),
(15, 'umerqureshi786786@gmail.com', 384225, NULL, '2024-11-02 08:32:31.049691'),
(16, 'umerqureshi786786@gmail.com', 49893, NULL, '2024-11-02 08:33:44.304847'),
(17, 'umerqureshi786786@gmail.com', 29892, NULL, '2024-11-02 08:43:57.239706'),
(18, 'umerqureshi786786@gmail.com', 132098, NULL, '2024-11-02 08:46:17.708877'),
(19, 'vinaydhariya21@gmail.com', 197511, NULL, '2024-11-02 10:01:02.463107'),
(20, 'shubhsoni1996th@gmail.com', 649018, NULL, '2024-11-02 12:21:31.975979'),
(21, 'vinaydhariya21@gmail.com', 52445, NULL, '2024-11-02 13:02:07.761740'),
(0, 'umerqureshi786786@gmail.com', 15577, NULL, '2024-12-25 12:09:50.640215'),
(0, 'umerqureshi786786@gmail.com', 305802, NULL, '2024-12-25 12:12:41.995921'),
(0, 'umerqureshi786786@gmail.com', 441528, NULL, '2024-12-25 12:17:33.904795'),
(0, 'umerqureshi786786@gmail.com', 969002, NULL, '2024-12-25 12:24:39.557547'),
(0, 'umerqureshi786786@gmail.com', 78049, NULL, '2024-12-25 12:28:49.622981'),
(0, 'umerqureshidoaguru@gmail.com', 922773, NULL, '2024-12-26 07:44:46.860702'),
(0, 'umerqureshidoaguru@gmail.com', 132076, NULL, '2024-12-26 07:54:38.571203'),
(0, 'umerqureshidoaguru@gmail.com', 380494, NULL, '2024-12-26 07:55:58.223044'),
(0, 'umerqureshidoaguru@gmail.com', 489279, NULL, '2025-01-02 13:55:14.473995'),
(0, 'umerqureshi786786@gmail.com', 846728, NULL, '2025-01-03 11:11:28.978719'),
(0, 'umerqureshidoaguru@gmail.com', 332411, NULL, '2025-01-03 11:13:22.214841'),
(0, 'umerqureshi786786@gmail.com', 747328, NULL, '2025-01-27 11:16:21.507521'),
(0, 'shubhamsonidoaguru@gmail.com', 739821, NULL, '2025-01-30 12:52:36.435637'),
(0, 'test@gmail.com', 473887, NULL, '2025-03-29 14:31:06.219299');

-- --------------------------------------------------------

--
-- Table structure for table `registered_data`
--

CREATE TABLE `registered_data` (
  `user_id` int(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registered_data`
--

INSERT INTO `registered_data` (`user_id`, `user_name`, `email`, `password`, `created_date`) VALUES
(34, 'test', 'test@gmail.com', '$2b$10$LswhTwq8Hwr88YMrXHC.Au8LU/3l.WIS4pQPU3DIEtgYYesLLXxL.', '2024-07-27 06:20:42'),
(35, 'Dev Ansh', 'depanshu123.doaguru@gmail.com', '$2b$10$rj5UKIumEqjp9/t/.QYRXuz1BTyiuruOILppFEA0bfqarKzt7LZeO', '2026-04-28 07:02:10'),
(36, 'Admin ', 'infoayushiconstruction@gmail.com', '$2b$10$LDoXvdfDHnytd68mb3MOzO9Maw6SaXxVDs9K07.VaobVCD/AlM4v6', '2025-04-02 11:53:05'),
(37, 'dev', 'devdeveloper998@gmail.com', '$2b$10$zpguUkK2YbXajy6kMjGTP.TENO2NQtx0UPTF50lMAAh5CxjMyiX7K', '2026-04-24 11:44:26');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `text_content` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `youtube_url` varchar(500) DEFAULT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `designation`, `text_content`, `image_url`, `video_url`, `youtube_url`, `created_at`, `updated_at`) VALUES
(1, 'Jhon Beta', NULL, 'hejsadbfjkasdfjksadkfb ajdbnfksbadfjkbksajdbc xcbsbdfh wsd cbw fjhwhbhbwqakxc  nj cwc cc  wjndfklsnxc  ndwfws c wjnbjf sc wq fcwqj ijwq ifji  iejndi wieqnfn  ej fijnn', NULL, NULL, NULL, '2026-04-23 12:23:20', '2026-04-23 12:23:20'),
(3, 'skjdfbsjdbn', 'tyrturturyy', 'sadfsdfsdfsdfdf', 'https://53.fs1.hubspotusercontent-na1.net/hubfs/53/Testimonial-lead-gen-1.webp', NULL, NULL, '2026-04-23 12:46:47', '2026-04-23 12:47:35'),
(4, 'Hello Video', 'Design Video', NULL, NULL, '1776928736831-618237270.mp4', NULL, '2026-04-23 12:48:57', '2026-04-23 12:48:57'),
(5, 'hello Youtube ', 'sgsgvs', NULL, NULL, NULL, 'https://youtube.com/shorts/k2XHBC8BbKw?si=5iwG_Zd1eZG-d2oc', '2026-04-23 12:55:56', '2026-04-23 12:55:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_slug` (`slug`),
  ADD KEY `idx_is_published` (`is_published`),
  ADD KEY `idx_published_date` (`published_date`),
  ADD KEY `idx_title` (`title`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_title` (`title`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `registered_data`
--
ALTER TABLE `registered_data`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name` (`name`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gallery_images`
--
ALTER TABLE `gallery_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `registered_data`
--
ALTER TABLE `registered_data`
  MODIFY `user_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `gallery_categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
