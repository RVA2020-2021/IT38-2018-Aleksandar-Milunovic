--brisanje tabela u slucaju da postoje, kako se ne bi pojavljivali duplikati (kaskadno brisanje)
DROP TABLE IF EXISTS kredit CASCADE;
DROP TABLE IF EXISTS klijent CASCADE;
DROP TABLE IF EXISTS tip_racuna CASCADE;
DROP TABLE IF EXISTS racun CASCADE;

--brisanje sekvence
drop sequence if exists kredit_seq;
drop sequence if exists klijent_seq;
drop sequence if exists racun_seq;
drop sequence if exists tip_racuna_seq;

--kreriranje tabela 
CREATE TABLE kredit(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500)
);

CREATE TABLE klijent(
	id integer not null,
	ime varchar(50),
	prezime varchar(50),
	broj_lk integer,
	kredit integer not null
);

CREATE TABLE tip_racuna(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500)
);

CREATE TABLE racun(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500),
	tip_racuna integer not null,
	klijent integer not null
);

--ogranicenja za primarne kljuceve 
ALTER TABLE kredit ADD CONSTRAINT pk_kredit PRIMARY KEY(id);
ALTER TABLE klijent ADD CONSTRAINT pk_klijent PRIMARY KEY(id);
ALTER TABLE tip_racuna ADD CONSTRAINT pk_tip_racuna PRIMARY KEY(id);
ALTER TABLE racun ADD CONSTRAINT pk_racun PRIMARY KEY(id);

--ogranicenja za strane kljuceve
ALTER TABLE klijent ADD CONSTRAINT fk_klijent_kredit FOREIGN KEY(kredit) REFERENCES kredit(id);
ALTER TABLE racun ADD CONSTRAINT fk_racun_klijent FOREIGN KEY(klijent) REFERENCES klijent(id);
ALTER TABLE racun ADD CONSTRAINT fk_racun_tip_racuna FOREIGN KEY(tip_racuna) REFERENCES tip_racuna(id);

--indeksi radi brze pretrage
CREATE INDEX idxpk_kredit ON kredit(id);
CREATE INDEX idxpk_klijent ON klijent(id);
CREATE INDEX idxpk_tip_racuna ON tip_racuna(id);
CREATE INDEX idxpk_racun ON racun(id);

CREATE INDEX idxfk_klijent_kredit ON klijent(kredit);
CREATE INDEX idxfk_racun_klijent ON racun(klijent);
CREATE INDEX idxfk_racun_tip_racuna ON racun(tip_racuna);

--kreiranje sekvence 
create sequence kredit_seq
increment 1;
create sequence klijent_seq
increment 1;
create sequence racun_seq
increment 1;
create sequence tip_racuna_seq
increment 1;