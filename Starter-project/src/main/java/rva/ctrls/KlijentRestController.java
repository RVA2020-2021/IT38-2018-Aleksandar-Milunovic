package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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
import rva.jpa.Klijent;
import rva.repository.KlijentRepository;

@CrossOrigin
@RestController
@Api(tags = {"Klijent CRUD operacije"})
public class KlijentRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@ApiOperation(value = "Vraæa kolekciju svih klijenata iz baze podataka")
	@GetMapping("klijent")
	public Collection<Klijent> getKlijenti() {
		return klijentRepository.findAll();
		}
	
	@ApiOperation(value = "Vraæa klijenta iz baze podataka na osnovu prosleðenog id-ja")
	@GetMapping("klijent/{id}")
	public Klijent getKlijent(@PathVariable("id") Integer id) {
		return klijentRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraæa kolekciju klijenata sa odgovarajuæim imenom iz baze podataka")
	@GetMapping("klijentIme/{ime}")
	public Collection<Klijent> getKlijentByIme(@PathVariable("ime") String ime){
		return klijentRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@ApiOperation(value = "Dodaje klijenta u bazu podataka podataka")
	@PostMapping("klijent")
	public ResponseEntity<Klijent> insertKlijent(@RequestBody Klijent klijent) {
		if(!klijentRepository.existsById(klijent.getId())) {
			klijentRepository.save(klijent);
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		}
		return new ResponseEntity<Klijent>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Menja klijenta")
	@PutMapping("klijent")
	public ResponseEntity<Klijent> updateKlijent(@RequestBody Klijent klijent) {
		if(!klijentRepository.existsById(klijent.getId())) {
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);
		}
		klijentRepository.save(klijent);
		return new ResponseEntity<Klijent>(HttpStatus.OK);
	}
	@ApiOperation(value = "Briše klijenta iz baze na osnovu vrednosti id-ja")
	@Transactional
	@DeleteMapping("klijent/{id}")
	public ResponseEntity<Klijent> deleteKlijent(@PathVariable("id") Integer id){
		if(!klijentRepository.existsById(id)) {
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM racun WHERE klijent =  " + id);
		klijentRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"klijent\"(\"id\", \"ime\", \"prezime\", \"broj_lk\", \"kredit\") "
					+ "VALUES (-100, 'Ime Test', 'Prezime Test', 100000000, 1)" 
					);
		}
		return new ResponseEntity<Klijent>(HttpStatus.OK);
	}
	

}
