-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2019-05-19 17:23:22
-- 服务器版本： 10.1.36-MariaDB
-- PHP 版本： 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `laravel_test`
--

-- --------------------------------------------------------

--
-- 表的结构 `custom_wish`
--

CREATE TABLE `custom_wish` (
  `id` int(11) NOT NULL,
  `wish_content` text CHARACTER SET utf8mb4 NOT NULL,
  `wisher_id` text CHARACTER SET utf8mb4 NOT NULL,
  `helper_id` text CHARACTER SET utf8mb4 NOT NULL,
  `situation` text CHARACTER SET utf8mb4 NOT NULL,
  `wisher_open` text CHARACTER SET utf8mb4 NOT NULL,
  `helper_open` text CHARACTER SET utf8mb4 NOT NULL,
  `fairry_path` text CHARACTER SET utf8mb4 NOT NULL,
  `time1` text CHARACTER SET utf8mb4 NOT NULL,
  `time2` text CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转储表的索引
--

--
-- 表的索引 `custom_wish`
--
ALTER TABLE `custom_wish`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `custom_wish`
--
ALTER TABLE `custom_wish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
