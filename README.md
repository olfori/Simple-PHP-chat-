# Simple-PHP-chat-
Simple chat in PHP

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
