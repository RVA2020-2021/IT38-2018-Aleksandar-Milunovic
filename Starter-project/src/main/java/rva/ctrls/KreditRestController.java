package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
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
import rva.jpa.Kredit;
import rva.repository.KreditRepository;

@CrossOrigin
@RestController
@Api(tags = {"Kredit CRUD operacije"})
public class KreditRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KreditRepository kreditRepository;
	
	@ApiOperation(value = "Vraæa kolekciju svih tipova kredita iz baze podataka")
	@GetMapping("kredit")
	public Collection<Kredit> getKrediti() {
		return kreditRepository.findAll();
	}
	
	@ApiOperation(value = "Vraæa odgovarajuæi kredit iz baze podataka")
	@GetMapping("kredit/{id}")
	public Kredit getKredit(@PathVariable("id") Integer id) {
		return kreditRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraæa kolekciju kredita na osnovu naziva iz baze podataka")
	@GetMapping("kreditNaziv/{naziv}")
	public Collection<Kredit> getKreditByNaziv(@PathVariable("naziv") String naziv){
		return kreditRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@ApiOperation(value = "Dodaje kredit u bazu podataka")
	@PostMapping("kredit")
	public ResponseEntity<Kredit> insertKredit(@RequestBody Kredit kredit) {
		if(!kreditRepository.existsById(kredit.getId())) {
			kreditRepository.save(kredit);
			return new ResponseEntity<Kredit>(HttpStatus.OK);
		}
		return new ResponseEntity<Kredit>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Menja kredit")
	@PutMapping("kredit")
	public ResponseEntity<Kredit> updateKredit(@RequestBody Kredit kredit){
		if(!kreditRepository.existsById(kredit.getId())) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
		}
		kreditRepository.save(kredit);
		return new ResponseEntity<Kredit>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Briše kredit iz baze podataka")
	@Transactional
	@DeleteMapping("kredit/{id}")
	public ResponseEntity<Kredit> deleteKredit(@PathVariable("id") Integer id){
		if(!kreditRepository.existsById(id)) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM klijent WHERE kredit = " + id);
		kreditRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"kredit\"(\"id\", \"naziv\", \"opis\", \"oznaka\") "
					+ "VALUES (-100, 'Test Naziv', 'Test Oznaka', 'Test Opis')" 
					);
		}
		return new ResponseEntity<Kredit>(HttpStatus.OK);
	}
}
