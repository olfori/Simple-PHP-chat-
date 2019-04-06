# Simple-PHP-chat-
Simple chat in PHP

First of all, create a table in mySQL:

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
