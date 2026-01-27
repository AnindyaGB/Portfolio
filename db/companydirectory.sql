-- Drop tables if they exist
DROP TABLE IF EXISTS personnel;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS location;

-- =========================
-- Table: location
-- =========================
CREATE TABLE location
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

INSERT INTO location
	(name)
VALUES
	('London'),
	('New York'),
	('Paris'),
	('Munich'),
	('Rome');

-- =========================
-- Table: department
-- =========================
CREATE TABLE department
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	locationID INT REFERENCES location(id)
);

INSERT INTO department
	(name, locationID)
VALUES
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

-- =========================
-- Table: personnel
-- =========================
CREATE TABLE personnel
(
	id SERIAL PRIMARY KEY,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	jobTitle VARCHAR(50),
	email VARCHAR(100),
	departmentID INT REFERENCES department(id)
);

INSERT INTO personnel
	(firstName, lastName, jobTitle, email, departmentID)
VALUES
	('Rosana', 'Heffron', '', 'rheffron0@ibm.com', 1),
	('Kris', 'Kovnot', '', 'kkovnot1@google.nl', 2),
	('Vera', 'Kisbee', '', 'vkisbee2@nih.gov', 2),
	('Aveline', 'Edgson', '', 'aedgson3@wikispaces.com', 3),
	('Bertie', 'Wittke', '', 'bwittke4@yahoo.com', 4),
	('Demetre', 'Cossam', '', 'dcossam5@washington.edu', 5),
	('Annabela', 'McGavigan', '', 'amcgavigan6@wp.com', 4),
	('Crichton', 'McAndrew', '', 'cmcandrew7@zdnet.com', 1),
	('Cordula', 'Plain', '', 'cplain8@google.ca', 5),
	('Glen', 'McDougle', '', 'gmcdougle9@meetup.com', 6),
	('Theo', 'Audas', '', 'taudasa@newsvine.com', 7),
	('Spense', 'Jolliss', '', 'sjollissb@wufoo.com', 8),
	('Leopold', 'Carl', '', 'lcarlc@paginegialle.it', 9),
	('Barr', 'MacAllan', '', 'bmacalland@github.com', 5),
	('Suzie', 'Cromer', '', 'scromere@imageshack.us', 1),
	('Tracee', 'Gisbourn', '', 'tgisbournf@bloglines.com', 10),
	('Taylor', 'St. Quintin', '', 'tstquinting@chronoengine.com', 10),
	('Lin', 'Klassmann', '', 'lklassmannh@indiatimes.com', 10),
	('Lay', 'Fintoph', '', 'lfintophi@goo.gl', 11),
	('Moishe', 'Flinn', '', 'mflinnj@list-manage.com', 12),
	('Gay', 'Bickford', '', 'gbickfordk@scientificamerican.com', 6),
	('Erik', 'Lindback', '', 'elindbackl@virginia.edu', 8),
	('Tamarra', 'Ace', '', 'tacem@vinaora.com', 9),
	('Barbara-anne', 'Rooksby', '', 'brooksbyn@issuu.com', 12),
	('Lucien', 'Allsup', '', 'lallsupo@goo.ne.jp', 9),
	('Jackelyn', 'Imlach', '', 'jimlachp@google.it', 11),
	('Virge', 'Bootes', '', 'vbootesq@oracle.com', 2),
	('Rafferty', 'Matasov', '', 'rmatasovr@4shared.com', 4),
	('Vanya', 'Goulder', '', 'vgoulders@phoca.cz', 9),
	('Bonita', 'McGonagle', '', 'bmcgonaglet@microsoft.com', 1),
	('Allx', 'Whaley', '', 'awhaleyu@bbb.org', 1),
	('Mavis', 'Lernihan', '', 'mlernihanv@netscape.com', 5),
	('Vern', 'Durling', '', 'vdurlingw@goo.gl', 1),
	('Myles', 'Minchi', '', 'mminchix@smugmug.com', 7),
	('Anitra', 'Coleridge', '', 'acoleridgey@nbcnews.com', 6),
	('Ailis', 'Brewster', '', 'abrewsterz@businesswire.com', 7),
	('Rahal', 'Tute', '', 'rtute10@pinterest.com', 6),
	('Warner', 'Blonden', '', 'wblonden11@spiegel.de', 12),
	('Melvyn', 'Canner', '', 'mcanner12@eepurl.com', 4),
	('Ryann', 'Giampietro', '', 'rgiampietro13@theguardian.com', 4),
	('Harwell', 'Jefferys', '', 'hjefferys14@jimdo.com', 10),
	('Lanette', 'Buss', '', 'lbuss15@51.la', 4),
	('Lissie', 'Reddington', '', 'lreddington16@w3.org', 9),
	('Dore', 'Braidford', '', 'dbraidford17@google.com.br', 11),
	('Lizabeth', 'Di Franceshci', '', 'ldifranceshci18@mediafire.com', 8),
	('Felic', 'Sharland', '', 'fsharland19@myspace.com', 12),
	('Duff', 'Quail', '', 'dquail1a@vimeo.com', 9),
	('Brendis', 'Shivell', '', 'bshivell1b@un.org', 1),
	('Nevile', 'Schimaschke', '', 'nschimaschke1c@hexun.com', 10),
	('Jon', 'Calbaithe', '', 'jcalbaithe1d@netvibes.com', 4),
	('Emmery', 'Darben', '', 'edarben1e@mapquest.com', 10),
	('Staford', 'Whitesel', '', 'swhitesel1f@nasa.gov', 6),
	('Benjamin', 'Hawkslee', '', 'bhawkslee1g@hubpages.com', 7),
	('Myrle', 'Speer', '', 'mspeer1h@tripod.com', 3),
	('Matthus', 'Banfield', '', 'mbanfield1i@angelfire.com', 3),
	('Annadiana', 'Drance', '', 'adrance1j@omniture.com', 3),
	('Rinaldo', 'Fandrey', '', 'rfandrey1k@bbc.co.uk', 2),
	('Roanna', 'Standering', '', 'rstandering1l@cocolog-nifty.com', 3),
	('Lorrie', 'Fattorini', '', 'lfattorini1m@geocities.jp', 9),
	('Talbot', 'Andrassy', '', 'tandrassy1n@bigcartel.com', 4),
	('Cindi', 'O''Mannion', '', 'comannion1o@ameblo.jp', 11),
	('Pancho', 'Mullineux', '', 'pmullineux1p@webmd.com', 1),
	('Cynthy', 'Peyntue', '', 'cpeyntue1q@amazon.co.jp', 6),
	('Kristine', 'Christal', '', 'kchristal1r@behance.net', 8),
	('Dniren', 'Reboulet', '', 'dreboulet1s@360.cn', 7),
	('Aggy', 'Napier', '', 'anapier1t@sciencedirect.com', 3),
	('Gayleen', 'Hessay', '', 'ghessay1u@exblog.jp', 4),
	('Cull', 'Snoden', '', 'csnoden1v@so-net.ne.jp', 1),
	('Vlad', 'Crocombe', '', 'vcrocombe1w@mtv.com', 7),
	('Georgeanna', 'Joisce', '', 'gjoisce1x@google.com.au', 6),
	('Ursola', 'Berthomieu', '', 'uberthomieu1y@un.org', 4),
	('Mair', 'McKirdy', '', 'mmckirdy1z@ovh.net', 1),
	('Erma', 'Runnalls', '', 'erunnalls20@spiegel.de', 8),
	('Heida', 'Gallone', '', 'hgallone21@hostgator.com', 10),
	('Christina', 'Denge', '', 'cdenge22@canalblog.com', 12),
	('Wilone', 'Fredi', '', 'wfredi23@gizmodo.com', 7),
	('Stormie', 'Bolderstone', '', 'sbolderstone24@globo.com', 11),
	('Darryl', 'Pool', '', 'dpool25@vistaprint.com', 11),
	('Nikolas', 'Mager', '', 'nmager26@nifty.com', 5),
	('Brittney', 'Gaskal', '', 'bgaskal27@weather.com', 10),
	('Field', 'Gresty', '', 'fgresty28@networkadvertising.org', 4),
	('Martina', 'Tremoulet', '', 'mtremoulet29@sciencedaily.com', 3),
	('Robena', 'Ivanyutin', '', 'rivanyutin2a@mozilla.org', 2),
	('Reagen', 'Corner', '', 'rcorner2b@qq.com', 11),
	('Eveleen', 'Sulter', '', 'esulter2c@nature.com', 6),
	('Christy', 'Dunbobbin', '', 'cdunbobbin2d@feedburner.com', 8),
	('Winthrop', 'Lansley', '', 'wlansley2e@alibaba.com', 8),
	('Lissa', 'Insley', '', 'linsley2f@friendfeed.com', 3),
	('Shell', 'Risebarer', '', 'srisebarer2g@patch.com', 10),
	('Cherianne', 'Liddyard', '', 'cliddyard2h@com.com', 2),
	('Brendan', 'Fooks', '', 'bfooks2i@utexas.edu', 2),
	('Edmund', 'Tace', '', 'etace2j@hatena.ne.jp', 9),
	('Ki', 'Tomasini', '', 'ktomasini2k@cnbc.com', 10),
	('Chadd', 'McGettrick', '', 'cmcgettrick2l@simplemachines.org', 10),
	('Dulcie', 'Baudi', '', 'dbaudi2m@last.fm', 3),
	('Barnebas', 'Mowbray', '', 'bmowbray2n@cbslocal.com', 1),
	('Stefanie', 'Anker', '', 'sanker2o@hud.gov', 5),
	('Cherye', 'de Cullip', '', 'cdecullip2p@loc.gov', 10),
	('Sinclare', 'Deverall', '', 'sdeverall2q@ow.ly', 6),
	('Shae', 'Johncey', '', 'sjohncey2r@bluehost.com', 10);

-- Unique indexes
CREATE UNIQUE INDEX ux_department_name ON department(name);
CREATE UNIQUE INDEX ux_location_name ON location(name);
