-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2019-05-19 07:38:50
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
-- 表的结构 `pre_wish`
--

CREATE TABLE `pre_wish` (
  `id` int(11) NOT NULL,
  `pre_wishes` text CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `pre_wish`
--

INSERT INTO `pre_wish` (`id`, `pre_wishes`) VALUES
(1, '想要约一个男生/女生一起吃早餐'),
(2, '想要和一个男生/女生周末约一次图书馆'),
(3, '想要收到一张能鼓励我（处于低谷）的手写明信片'),
(4, '想要连续三天收到一位男生/女生的晚安'),
(5, '想要一杯奶茶'),
(6, '想找一个小伙伴周六晚约烧烤（夜宵）'),
(7, '想找一位男生/女生晨跑/晚上乐跑'),
(8, '想要收到一份暖心校早'),
(9, '希望有人教我做一道高数题'),
(10, '希望有人在周末能叫我起床'),
(11, '帮我去图书馆借（还）书'),
(12, '连续一个星期每天早上打电话叫我起床'),
(13, '想要有人帮我拿外卖'),
(14, '想要有一个人帮我取快递'),
(15, '想要有一个人陪我去看电影'),
(16, '想要有人给我唱首歌'),
(17, '想要有一个人给我讲一个笑话'),
(18, '想要有一个人陪我去蹦迪'),
(19, '想要有一个人陪我去纹身'),
(20, '想要有一个人陪我去蹦极'),
(21, '想要有一个人陪我喝酒'),
(22, '做我拍照的模特'),
(23, '想要一个可爱的水杯'),
(24, '想吃有猕猴桃和西瓜的水果捞'),
(25, '想蘸着甜辣酱吃一顿炸鸡'),
(26, '告诉我你最喜欢的一本书'),
(27, '给我读一首诗'),
(28, '告诉我你吃过的最棒的一家海鲜餐厅'),
(29, '想要喝一杯烧仙草'),
(30, '想要有人教我C++代码(陪我去图书馆)'),
(31, '想要有人能和我LOL开黑(一区艾欧尼亚)'),
(32, '想要有人能陪我一起看电影'),
(33, '想要借读未来简史这本书(看完的话就会还)'),
(34, '想要有人给我指导下数学分析'),
(35, '想要有人送我个LOL里皇子皮肤(一区)'),
(36, '想要有人寄一张来自家乡的明信片'),
(37, '想要有人和我分享你最喜欢的书/CD'),
(38, '想要有人给我手写一份节日祝福'),
(39, '我希望有人和我一起看日出'),
(40, '我希望用一台新键盘/新鼠标'),
(41, '我希望有人能和我一起跑步'),
(42, '想要有人讲解下去香港留学需要准备什么'),
(43, '想要有人送我你喜欢吃的零食'),
(44, '想要找人组队参加数学建模比赛'),
(45, '想要有人教我用ps'),
(46, '想要有人周三下晚课后陪我走回宿舍'),
(47, '想要找人一起去看演唱会/漫展'),
(48, '想要找人一起打球'),
(49, '想要找人一起去韩国旅游'),
(50, '想要找人一起健身'),
(51, '我想要吃奥利奥口味的可爱多'),
(52, '我希望有人能给我推荐广州的一个小吃'),
(53, '我想有人和我一起用同一个系列的沙雕微信头像一周'),
(54, '我希望有人可以推荐一部喜剧'),
(55, '希望有人可以帮我给我们楼里的舍管阿姨送花'),
(56, '希望有人下次点外卖的时候以我的名义给外卖小哥也买一份'),
(57, '希望有人能监督我不要熬夜');

--
-- 转储表的索引
--

--
-- 表的索引 `pre_wish`
--
ALTER TABLE `pre_wish`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `pre_wish`
--
ALTER TABLE `pre_wish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
