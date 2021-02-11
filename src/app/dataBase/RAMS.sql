CREATE DATABASE RAMS;
USE RAMS;

CREATE TABLE ramtype(
	id INT PRIMARY KEY,
    Ttype CHAR(128)
);

CREATE TABLE rambrand (
	id INT PRIMARY KEY,
    ramtype_id INT,
    Brand char(128),
	Model char(128) NOT NULL,
    Clock_speed char(128),
    Size char(128),
    CAS_latency char(128),
    ECC_status char(128),
    Price INT,
    FOREIGN KEY (ramtype_id) REFERENCES ramtype(id)
);
INSERT INTO ramtype(id, Ttype)
 VALUES('1', 'DDR3'),
 ('2', 'DDR4');
 
 INSERT INTO rambrand (id, ramtype_id, Brand, Model, Clock_speed, Size, CAS_latency, ECC_status, Price)
 VALUES('1', '1', 'Corsair', 'Corsair Vengeance LED', '3466MHz', '16GB', '16', 'Low', '311.03'),
 ('2', '2', 'G.Skill', 'G.Skill Trident Z RGB', '4266HMz', '16GB', '14-19', 'Low', '299'),
 ('3', '1', 'Kingston', 'Kingston HyperX Predator', '1866-2666HMz', '16GB', '9-11', 'High', '100'),
 ('4', '2', 'Crucial', 'Crucial Ballistix Sport', '2663HMz', '32GB', '14-16', 'High', '31.50'),
 ('5', '1', 'HyperX', 'HyperX Fury RGB 3733MHz', '2400-3733HMz', '32GB', '15-19', 'Low', '75.99');