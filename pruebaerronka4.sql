-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2019 a las 13:47:01
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pruebaerronka4`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_categorias_load` ()  NO SQL
SELECT * FROM categorias$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_datosMedicos_load` ()  NO SQL
SELECT * FROM datosmedicos$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_equipo_load` ()  NO SQL
SELECT * FROM equipo$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tipoUsuario_load` ()  NO SQL
SELECT * FROM tipousuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_load` ()  NO SQL
SELECT * FROM usuario$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `nombre`) VALUES
(1, 'Alevin'),
(2, 'Infantil'),
(3, 'Senior');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosmedicos`
--

CREATE TABLE `datosmedicos` (
  `idDatosMedicos` int(11) NOT NULL,
  `datos` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `ultimaRevision` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `datosmedicos`
--

INSERT INTO `datosmedicos` (`idDatosMedicos`, `datos`, `ultimaRevision`) VALUES
(1, 'apto', '2019-12-04'),
(2, 'apto', '2019-12-04'),
(3, 'apto', '2019-12-04'),
(4, 'apto', '2019-12-04'),
(5, 'apto', '2019-12-04'),
(6, 'apto', '2019-12-04'),
(7, 'apto', '2019-12-04'),
(8, 'apto', '2019-12-04'),
(9, 'apto', '2019-12-04'),
(10, 'apto', '2019-12-04'),
(11, 'apto', '2019-12-04'),
(12, 'apto', '2019-12-04'),
(13, 'apto', '2019-12-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `idEquipo` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`idEquipo`, `idCategoria`, `nombre`) VALUES
(1, 1, 'Albacete Petanca Club Alevin'),
(2, 2, 'Albacete Petanca Club Infantil'),
(3, 3, 'Albacete Petanca Club Senior');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE `tipousuario` (
  `idTipo` int(11) NOT NULL,
  `nombre` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`idTipo`, `nombre`) VALUES
(1, 'Admin'),
(2, 'Entrenador'),
(3, 'Jugador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `idTipo` int(11) NOT NULL,
  `idEquipo` int(11) NOT NULL,
  `nombre` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `idDatosMedicos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `idTipo`, `idEquipo`, `nombre`, `idDatosMedicos`) VALUES
(1, 1, 3, 'admin', 1),
(2, 2, 1, 'Raul Gomez', 2),
(3, 3, 1, 'Pedro Garcia', 3),
(4, 3, 1, 'Juan Perez', 4),
(5, 3, 1, 'Maria Ruiz', 5),
(6, 2, 2, 'Roberto Gonzalez', 6),
(7, 3, 2, 'Juan Morales', 7),
(8, 3, 2, 'Rosa Gil', 8),
(9, 3, 2, 'Alberto Fernandez', 9),
(10, 2, 3, 'Francisco Ramos', 10),
(11, 3, 3, 'Yolanda Matarranz', 11),
(12, 3, 3, 'Manuel Romero', 12),
(13, 3, 3, 'Jordi Martinez', 13);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `datosmedicos`
--
ALTER TABLE `datosmedicos`
  ADD PRIMARY KEY (`idDatosMedicos`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`idEquipo`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idTipo` (`idTipo`),
  ADD KEY `idEquipo` (`idEquipo`),
  ADD KEY `idDatosMedicos` (`idDatosMedicos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `datosmedicos`
--
ALTER TABLE `datosmedicos`
  MODIFY `idDatosMedicos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `idEquipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipousuario` (`idTipo`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idDatosMedicos`) REFERENCES `datosmedicos` (`idDatosMedicos`),
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
