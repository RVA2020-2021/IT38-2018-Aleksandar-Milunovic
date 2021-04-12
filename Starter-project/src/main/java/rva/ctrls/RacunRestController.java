package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Racun;
import rva.repository.RacunRepository;

@CrossOrigin
@RestController
@Api(tags = {"Racun CRUD operacije"})
public class RacunRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@ApiOperation(value = "Vraæa kolekciju raèuna iz baze podataka")
	@GetMapping("racun")
	public Collection<Racun> getRacuni() {
		return racunRepository.findAll();
	}
	
	@ApiOperation(value = "Vraæa odgovarajuæi raèun iz baze podataka na osnovu vrednosti id-ja")
	@GetMapping("racun/{id}")
	public Racun getRacun(@PathVariable("id") Integer id) {
		return racunRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraæa kolekciju raèuna na osnovu naziva iz baze podataka")
	@GetMapping("racunOznaka/{oznaka}")
	public Collection<Racun> getRacunByOznaka(@PathVariable("oznaka") String oznaka) {
		return racunRepository.findByOznakaContainingIgnoreCase(oznaka);
	}
	
	@ApiOperation(value = "Dodaje raèun u bazu podataka")
	@PostMapping("racun")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	} 
	
	@ApiOperation(value = "Menja raèun")
	@PutMapping("racun")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId())) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Briše raèun na osnovu id-ja iz baze podataka")
	@DeleteMapping("racun/{id}")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id) {
		if(!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"racun\"(\"id\", \"naziv\", \"oznaka\", \"opis\", \"tip_racuna\", \"klijent\") "
					+ "VALUES (-100, 'Naziv Test', 'Oznaka Test', 'Opis Test', 1, 1)" 
					);
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	

}
