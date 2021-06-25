package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Racun;
import rva.jpa.TipRacuna;

public interface RacunRepository extends JpaRepository<Racun, Integer>{
	
	Collection<Racun> findByOznakaContainingIgnoreCase(String oznaka);
	Collection<Racun> findByTipRacuna(TipRacuna tp);

}
