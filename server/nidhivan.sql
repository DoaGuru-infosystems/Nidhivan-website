-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2026 at 08:29 AM
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
-- Database: `nidhivan`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `meta_title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `meta_description` varchar(160) DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `published_date` varchar(100) NOT NULL,
  `updated_date` varchar(100) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `author`, `category`, `short_description`, `meta_title`, `slug`, `content`, `image_url`, `meta_description`, `meta_keywords`, `published_date`, `updated_date`, `is_published`) VALUES
(3, 'Why Investing in Farmland is One of the Smartest Decisions in 2026', 'Nidhivan Developer Team', 'Investment', 'Real estate has always been one of the safest investment options, and in recent years, farmland investments have gained significant attention among investors and families looking for long-term value.', 'Why Investing in Farmland is One of the Smartest Decisions in 2026', 'why-investing-in-farmland-is-one-of-the-smartest-decisions-in-2026', '<h2>Introduction</h2><p>Real estate has always been one of the safest investment options, and in recent years, <strong>farmland investments</strong> have gained significant attention among investors and families looking for long-term value.</p><p>Unlike many traditional investment options, farmland offers the perfect combination of <strong>asset appreciation, financial security, and a peaceful lifestyle</strong>. Whether you are planning to build a weekend farmhouse or looking for a long-term investment opportunity, farmland can be an excellent choice.</p><hr><h2>Why Farmland is Becoming Popular</h2><p>The demand for farmland has increased due to rapid urban expansion and the growing desire for open, pollution-free environments.</p><p>Some of the key advantages include:</p><ul><li><p>Long-term value appreciation</p></li><li><p>Lower maintenance compared to residential properties</p></li><li><p>Opportunity to build farmhouses</p></li><li><p>Peaceful environment away from city traffic</p></li><li><p>Better investment diversification</p></li></ul><hr><h2>Choosing the Right Location</h2><p>Location plays a crucial role in determining the future value of any property.</p><p>Before investing, always consider:</p><ul><li><p>Road connectivity</p></li><li><p>Nearby residential developments</p></li><li><p>Legal documentation</p></li><li><p>Water and electricity availability</p></li><li><p>Future infrastructure projects</p></li><li><p>Accessibility from the city</p></li></ul><p>A well-connected property often experiences better appreciation over time.</p><hr><h2>Importance of Legal Verification</h2><p>Never invest in land without verifying the legal documentation.</p><p>Always ensure:</p><ul><li><p>Clear ownership</p></li><li><p>Proper registry</p></li><li><p>Government-approved records</p></li><li><p>Verified land boundaries</p></li><li><p>No legal disputes</p></li></ul><p>Working with a trusted developer helps simplify this process and provides greater confidence during the purchase.</p><hr><h2>Building Your Dream Farmhouse</h2><p>Farmland is no longer just for agriculture.</p><p>Today, many families purchase farmland to create:</p><ul><li><p>Weekend farmhouses</p></li><li><p>Nature retreats</p></li><li><p>Holiday homes</p></li><li><p>Organic farming spaces</p></li><li><p>Investment properties</p></li></ul><p>A thoughtfully planned farmhouse provides both lifestyle benefits and long-term financial value.</p><hr><h2>Why Choose Nidhivan Developer</h2><p>At <strong>Nidhivan Developer</strong>, we believe every investment should offer complete peace of mind.</p><p>We focus on:</p><ul><li><p>Premium locations</p></li><li><p>Transparent documentation</p></li><li><p>Customer-first service</p></li><li><p>Quality development</p></li><li><p>Long-term investment opportunities</p></li></ul><p>Our goal is to help families find properties that combine security, comfort, and future growth.</p><hr><h2>Final Thoughts</h2><p>Investing in farmland is more than purchasing land—it\'s about creating opportunities for the future.</p><p>With proper research, legal transparency, and the right location, farmland can become one of the most rewarding investments for individuals and families alike.</p><p>If you\'re planning your next investment, take the time to explore trusted opportunities and choose a developer who values transparency and customer satisfaction above everything else.</p>', '1785501006019-841302850.jfif', 'Real estate has always been one of the safest investment options, and in recent years, farmland investments have gained significant attention among investors an', 'farmland-investment real-estate farmhouse property-investment jabalpur land-investment nidhivan-developer', '2026-07-31 17:58:36', '2026-07-31 18:00:06', 1),
(4, '10 Reasons Why Investing in Real Estate is a Smart Decision in 2026', 'admin', 'Investment', 'dffgsdfgsdfg', '10 Reasons Why Investing in Real Estate is a Smart Decision in 2026', '10-reasons-why-investing-in-real-estate-is-a-smart-decision-in-2026-2', '<p>dfgl;\\\'dff;g\\\'\';fg\\g\';dfd\\\'f;ggsdfdfg</p>', '1785571657603-102567394.png', 'dag\\\'\\dfg\\\'s;dfg\\\';dsf\\f\'g;\'sdfd;fg\r\n\\\\;sdffgsddffgffdg', 'farmland-investment real-estate farmhouse property-investment jabalpur land-investment nidhivan-developer', '2026-08-01 13:37:37', '2026-08-01 13:37:37', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `mobile_no`, `subject`, `address`, `message`, `created_date`) VALUES
(23, 'Test User', 'test@example.com', '1234567890', 'Test Inquiry', '', 'This is a test message from automated system.', '2026-07-30 10:02:26'),
(24, 'ashish1', 'ad201054@gmail.com', 'Not Provided', 'Contact Us Form Inquiry', '', 'sadasdasdasd', '2026-07-31 11:20:47'),
(25, 'Ad Dubay 2', 'ad201054@gmail.com', '09424399746', 'Quick Inquiry from Home Page', '', 'Please contact me for a free consultation.', '2026-07-31 11:20:59'),
(26, 'Ad Dubay3', 'ad201054@gmail.com', '09424399746', 'Quick Inquiry from Home Page', '', 'Please contact me for a free consultation.', '2026-07-31 11:21:16'),
(27, 'ashish3', 'ad201054@gmail.com', '9424399746', 'Header Contact Inquiry', '', 'sLJKfdgsd;ojfh sdhgokkhaerrpoiotggjjpidg;klvj oiadfhg\'lksdkfnf', '2026-07-31 11:30:20'),
(28, 'ashishkasdfkajkl', 'ad201054@gmail.comsdfgsaddfasddf', '9424399746', 'Header Contact Inquiry', '', 'dsfasdfasdffffffffffffffffffffff', '2026-07-31 11:30:54');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_categories`
--

INSERT INTO `gallery_categories` (`id`, `title`, `thumbnail_image`, `created_at`, `updated_at`) VALUES
(9, 'hello world', 'thumbnail_image-1785497020748-573757913.jfif', '2026-07-31 16:37:14', '2026-07-31 16:53:40'),
(10, 'villa', 'thumbnail_image-1785571749732-514389931.png', '2026-08-01 13:39:09', '2026-08-01 13:39:09');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

CREATE TABLE `gallery_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_images`
--

INSERT INTO `gallery_images` (`id`, `category_id`, `image_url`, `title`, `address`, `created_at`, `updated_at`) VALUES
(20, 9, 'images-1785496034126-617318689.jpeg', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(21, 9, 'images-1785496034127-726571636.png', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(22, 9, 'images-1785496034127-408391034.png', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(23, 9, 'images-1785496034131-199255214.png', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(24, 9, 'images-1785496034131-200660158.png', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(25, 9, 'images-1785496034131-475562868.png', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(26, 9, 'images-1785496034131-381751200.png', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(27, 9, 'images-1785496034135-928037162.jpg', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(28, 9, 'images-1785496034135-363616326.jpg', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(29, 9, 'images-1785496034136-952812226.jpg', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(30, 9, 'images-1785496034136-163938943.jpg', 'test', 'jabalpur', '2026-07-31 16:37:14', '2026-07-31 16:37:14'),
(31, 10, 'images-1785571749808-12319041.png', 'home', 'jabalpur', '2026-08-01 13:39:09', '2026-08-01 13:39:09'),
(32, 10, 'images-1785571749814-231578199.JPG', 'home', 'jabalpur', '2026-08-01 13:39:09', '2026-08-01 13:39:09'),
(33, 10, 'images-1785571749862-426743786.jpg', 'home', 'jabalpur', '2026-08-01 13:39:09', '2026-08-01 13:39:09'),
(34, 10, 'images-1785571749863-760350297.webp', 'home', 'jabalpur', '2026-08-01 13:39:09', '2026-08-01 13:39:09'),
(35, 10, 'images-1785571749863-890635883.jpeg', 'home', 'jabalpur', '2026-08-01 13:39:09', '2026-08-01 13:39:09'),
(36, 10, 'images-1785571749863-152277470.jpeg', 'home', 'jabalpur', '2026-08-01 13:39:09', '2026-08-01 13:39:09');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `type`, `status`, `location`, `category`, `description`, `created_at`, `updated_at`) VALUES
(3, 'nidhiwan developrs farmhouse', 'residential', 'ongoing', 'Hinotiya bargi Main road, ka, near The Royal Heritage Public School, Jabalpur, Madhya Pradesh 482021', 'farm house', 'jaru jarur lena chahiye ap ko \r\n', '2026-08-07 08:27:54', '2026-08-07 08:27:54');

-- --------------------------------------------------------

--
-- Table structure for table `project_images`
--

CREATE TABLE `project_images` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_images`
--

INSERT INTO `project_images` (`id`, `project_id`, `image_url`, `created_at`, `updated_at`) VALUES
(17, 3, '1786091274347-311701612.jpeg', '2026-08-07 08:27:54', '2026-08-07 08:27:54'),
(18, 3, '1786091274350-540239929.jpeg', '2026-08-07 08:27:54', '2026-08-07 08:27:54'),
(19, 3, '1786091274353-982290416.jpg', '2026-08-07 08:27:54', '2026-08-07 08:27:54'),
(20, 3, '1786091274358-368473433.jpg', '2026-08-07 08:27:54', '2026-08-07 08:27:54'),
(21, 3, '1786091274363-611086276.jpg', '2026-08-07 08:27:54', '2026-08-07 08:27:54'),
(22, 3, '1786091274367-826040634.jpg', '2026-08-07 08:27:54', '2026-08-07 08:27:54');

-- --------------------------------------------------------

--
-- Table structure for table `registered_data`
--

CREATE TABLE `registered_data` (
  `user_id` int(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `password` varchar(100) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registered_data`
--

INSERT INTO `registered_data` (`user_id`, `user_name`, `email`, `role`, `password`, `created_date`) VALUES
(38, 'Ad Dubay', 'ad201054@gmail.com', 'user', '$2b$10$UhV5AsrnSTNytU318gwIkOJkD/B8X/wGoIX8I9uiIqCuSphDR9o/.', '2026-07-30 08:17:20');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_type` (`type`);

--
-- Indexes for table `project_images`
--
ALTER TABLE `project_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_project_id` (`project_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `gallery_images`
--
ALTER TABLE `gallery_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_images`
--
ALTER TABLE `project_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `registered_data`
--
ALTER TABLE `registered_data`
  MODIFY `user_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `gallery_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_images`
--
ALTER TABLE `project_images`
  ADD CONSTRAINT `fk_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
