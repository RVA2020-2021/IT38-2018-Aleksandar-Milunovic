--PODACI ZA KREDIT

INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('kredit_seq'), 'Stambeni kredit', 'Kredit 1', 'Stambeni krediti odobravaju se klijentima banke sa redovnim primanjima zarade / penzije na tekucem racunu otvorenom kod banke, sa rokom otplate do 30 godina.');
INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('kredit_seq'), 'Dinarski kes kredit', 'Kredit 2', 'Dinarski kes kredit sa fiksnom, varijabilnom i kombinovanom kamatnom stopom, sa rokom otplate, do 71 meseca.');
INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('kredit_seq'), 'Kredit za penzionere', 'Kredit 3', 'Kes kredit za penzionere koji mogu biti klijenti banke, a i ne moraju.');
INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('kredit_seq'), 'Studentski kredit', 'Kredit 4', 'Studentski kredit se moze odobriti ucenicima i studentima, od 16 do 26 godina.');
INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('kredit_seq'), 'Krediti za energetsku efikasnost', 'Kredit 5', 'Potrosacki kredit za energetsku efikasnost u dinarima, za tehnologiju koja se nalazi u katalogu, sa minimalnom kamatnom stopom.');

INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (-100, 'TestNazivKredita', 'TestOznakaKredita', 'TestOpisKredita');

--PODACI ZA KLIJENTA

INSERT INTO "klijent" ("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (nextval('klijent_seq'), 'Zdravko', 'Tankosic', 007856418, 1);
INSERT INTO "klijent" ("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (nextval('klijent_seq'), 'Biljana', 'Paulic', 004854123, 2);
INSERT INTO "klijent" ("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (nextval('klijent_seq'), 'Mirko', 'Rasic', 009845712, 4);
INSERT INTO "klijent" ("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (nextval('klijent_seq'), 'Zivorad', 'Velimirovic', 001245786, 3);
INSERT INTO "klijent" ("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (nextval('klijent_seq'), 'Strahinja', 'Ilic', 004287453, 5);

INSERT INTO "klijent" ("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (-100, 'TestImeKlijenta', 'TestPrezimeKlijenta', 000000000, -100);

--PODACI ZA TIP RACUNA

INSERT INTO "tip_racuna" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('tip_racuna_seq'), 'Tekuci racun', 'TEKR', 'Postoji nekoliko vrsta tekuceg racuna, a to su aktiv, klasik, premium, start i osnovni racun.');
INSERT INTO "tip_racuna" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('tip_racuna_seq'), 'Dinarski racun', 'DINR', 'Dinarski se moze koristiti za licne uplate kao i za izvrsavanje transakcija. Banka vrsi otvaranje i namenskih racuna za trgovanje hartijama od vrednosti, polaganje osnivackih uloga za pravna lica i dr. Otvaranje i vodjenje dinarskog racuna je besplatno.');
INSERT INTO "tip_racuna" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('tip_racuna_seq'), 'Devizni racun', 'DVZR', 'Na devizni racun se mogu uplatiti sledece valute: EUR, AUD, CAD, DKK, JPY, NOK, RUB, SEK, GBP, USD i CNY. Moze biti koristan za prilive kako iz inostranstva, tako i iz zemlje.');
INSERT INTO "tip_racuna" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('tip_racuna_seq'), 'Dozvoljeno prekoracenje', 'DOZPREK', 'Pravo na dozvoljeno prekoracenje po tekucem racunu imaju vlasnici tekucih racuna koji ostvaruju redovan mesecni priliv po osnovu zarade ili penzije, odnosno Ugovora o otkupu poljoprivrednih proizvoda.');
INSERT INTO "tip_racuna" ("id", "naziv", "oznaka", "opis")
VALUES (nextval('tip_racuna_seq'), 'Trajni nalog', 'TRNAL', 'Neophodno je otvoriti tekuci racun, potpisati zahtev za otvaranje trajnog naloga i priloziti sve elemente racuna, koji ce ubuduce banka izmirivati.');

INSERT INTO "tip_racuna" ("id", "naziv", "oznaka", "opis")
VALUES (-100, 'TestNazivTipaRacuna', 'TestOznakaTipaRacuna', 'TestOpisTipaRacuna');

--PODACI ZA RACUN

INSERT INTO "racun" ("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (nextval('racun_seq'), 'Studentski racun', 'STUDR', 'Priliv stipendije na racun ucenika/studenta.', 1, 3);
INSERT INTO "racun" ("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (nextval('racun_seq'), 'Racun za troskove domacinstva', 'RZTD', 'Placanje svih racuna na osnovu trajnog naloga.', 5, 4);
INSERT INTO "racun" ("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (nextval('racun_seq'), 'Stambeni racun', 'STAMR', 'Racun preko kojeg se isplacuje ugovorna obaveza stanodavcu.', 2, 1);
INSERT INTO "racun" ("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (nextval('racun_seq'), 'Racun za kupovinu tehnologije', 'RZKT', 'Racun preko kojeg se vrsi isplata industrijske masine, koja je narucena spram potreba navedenih u izvestaju od strane preduzeca.', 1, 5);

INSERT INTO "racun" ("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (-100, 'TestNazivRacuna', 'TestOznakaRacuna', 'TestOpisRacuna', -100, -100);
