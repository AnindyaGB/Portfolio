/* Create database if it does not exist */
IF DB_ID('companydirectory') IS NULL
BEGIN
    CREATE DATABASE companydirectory;
END;
GO

USE companydirectory;
GO

/* =========================
   Table: location
   ========================= */
IF OBJECT_ID('dbo.location', 'U') IS NOT NULL
    DROP TABLE dbo.location;
GO

CREATE TABLE dbo.location (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NULL
);
GO

INSERT INTO dbo.location (name) VALUES
('London'),
('New York'),
('Paris'),
('Munich'),
('Rome');
GO

/* =========================
   Table: department
   ========================= */
IF OBJECT_ID('dbo.department', 'U') IS NOT NULL
    DROP TABLE dbo.department;
GO

CREATE TABLE dbo.department (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NULL,
    locationID INT NULL
);
GO

INSERT INTO dbo.department (name, locationID) VALUES
('Human Resources', 1),
('Sales', 2),
('Marketing', 2),
('Legal', 1),
('Services', 1),
('Research and Development', 3),
('Product Management', 3),
('Training', 4),
('Support', 4),
('Engineering', 5),
('Accounting', 5),
('Business Development', 3);
GO

/* =========================
   Table: personnel
   ========================= */
IF OBJECT_ID('dbo.personnel', 'U') IS NOT NULL
    DROP TABLE dbo.personnel;
GO

CREATE TABLE dbo.personnel (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(50) NULL,
    lastName NVARCHAR(50) NULL,
    jobTitle NVARCHAR(50) NULL,
    email NVARCHAR(50) NULL,
    departmentID INT NULL
);
GO

INSERT INTO dbo.personnel (firstName, lastName, jobTitle, email, departmentID) VALUES
('Rosana','Heffron','', 'rheffron0@ibm.com', 1),
('Kris','Kovnot','', 'kkovnot1@google.nl', 2),
('Vera','Kisbee','', 'vkisbee2@nih.gov', 2),
('Aveline','Edgson','', 'aedgson3@wikispaces.com', 3),
('Bertie','Wittke','', 'bwittke4@yahoo.com', 4),
('Demetre','Cossam','', 'dcossam5@washington.edu', 5),
('Annabela','McGavigan','', 'amcgavigan6@wp.com', 4),
('Crichton','McAndrew','', 'cmcandrew7@zdnet.com', 1),
('Cordula','Plain','', 'cplain8@google.ca', 5),
('Glen','McDougle','', 'gmcdougle9@meetup.com', 6),
('Theo','Audas','', 'taudasa@newsvine.com', 7),
('Spense','Jolliss','', 'sjollissb@wufoo.com', 8),
('Leopold','Carl','', 'lcarlc@paginegialle.it', 9),
('Barr','MacAllan','', 'bmacalland@github.com', 5),
('Suzie','Cromer','', 'scromere@imageshack.us', 1),
('Tracee','Gisbourn','', 'tgisbournf@bloglines.com', 10),
('Taylor','St. Quintin','', 'tstquinting@chronoengine.com', 10),
('Lin','Klassmann','', 'lklassmannh@indiatimes.com', 10),
('Lay','Fintoph','', 'lfintophi@goo.gl', 11),
('Moishe','Flinn','', 'mflinnj@list-manage.com', 12),
('Gay','Bickford','', 'gbickfordk@scientificamerican.com', 6),
('Erik','Lindback','', 'elindbackl@virginia.edu', 8),
('Tamarra','Ace','', 'tacem@vinaora.com', 9),
('Barbara-anne','Rooksby','', 'brooksbyn@issuu.com', 12),
('Lucien','Allsup','', 'lallsupo@goo.ne.jp', 9),
('Jackelyn','Imlach','', 'jimlachp@google.it', 11),
('Virge','Bootes','', 'vbootesq@oracle.com', 2),
('Rafferty','Matasov','', 'rmatasovr@4shared.com', 4),
('Vanya','Goulder','', 'vgoulders@phoca.cz', 9),
('Bonita','McGonagle','', 'bmcgonaglet@microsoft.com', 1),
('Allx','Whaley','', 'awhaleyu@bbb.org', 1),
('Mavis','Lernihan','', 'mlernihanv@netscape.com', 5),
('Vern','Durling','', 'vdurlingw@goo.gl', 1),
('Myles','Minchi','', 'mminchix@smugmug.com', 7),
('Anitra','Coleridge','', 'acoleridgey@nbcnews.com', 6),
('Ailis','Brewster','', 'abrewsterz@businesswire.com', 7),
('Rahal','Tute','', 'rtute10@pinterest.com', 6),
('Warner','Blonden','', 'wblonden11@spiegel.de', 12),
('Melvyn','Canner','', 'mcanner12@eepurl.com', 4),
('Ryann','Giampietro','', 'rgiampietro13@theguardian.com', 4),
('Harwell','Jefferys','', 'hjefferys14@jimdo.com', 10),
('Lanette','Buss','', 'lbuss15@51.la', 4),
('Lissie','Reddington','', 'lreddington16@w3.org', 9),
('Dore','Braidford','', 'dbraidford17@google.com.br', 11),
('Lizabeth','Di Franceshci','', 'ldifranceshci18@mediafire.com', 8),
('Felic','Sharland','', 'fsharland19@myspace.com', 12),
('Cindi','O''Mannion','', 'comannion1o@ameblo.jp', 11);
GO

CREATE UNIQUE INDEX UX_Department_Name
ON department (name);

CREATE UNIQUE INDEX UX_Location_Name
ON location (name);
