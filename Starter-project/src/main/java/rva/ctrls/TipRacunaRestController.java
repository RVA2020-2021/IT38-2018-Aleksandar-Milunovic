package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
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
import rva.jpa.TipRacuna;
import rva.repository.TipRacunaRepository;

@CrossOrigin
@RestController
@Api(tags = {"Tip Racuna CRUD operacije"})
public class TipRacunaRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private TipRacunaRepository tpRepository;
	
	@ApiOperation(value = "Vraæa kolekciju svih tipova raèuna iz baze podataka")
	@GetMapping("tipRacuna")
	public Collection<TipRacuna> getTipoviRacuna(){
		return tpRepository.findAll();
	}
	
	@ApiOperation(value = "Vraæa tip raèuna po zadatom id-ju")
	@GetMapping("tipRacuna/{id}") 
	public TipRacuna getTipRacuna(@PathVariable("id") Integer id) {
		return tpRepository.getOne(id);
	}
	
	@ApiOperation(value = "Vraæa kolekciju svih tipova raèuna na osnovu zadate oznake")
	@GetMapping("tipRacunaOznaka/{oznaka}")
	public Collection<TipRacuna> getTipRacunaByOznaka(@PathVariable("oznaka") String oznaka){
		return tpRepository.findByOznakaContainingIgnoreCase(oznaka);
	}
	
	@ApiOperation(value = "Dodaje tip raèuna u bazu podataka")
	@PostMapping("tipRacuna")
	public ResponseEntity<TipRacuna> insertTipRacuna(@RequestBody TipRacuna tipRacuna) {
		if(!tpRepository.existsById(tipRacuna.getId())) {
			tpRepository.save(tipRacuna);
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Menja tip raèuna")
	@PutMapping("tipRacuna")
	public ResponseEntity<TipRacuna> updateTipRacuna(@RequestBody TipRacuna tipRacuna) {
		if(!tpRepository.existsById(tipRacuna.getId())) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
		}
		tpRepository.save(tipRacuna);
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Briše tip raèuna na osnovu vrednosti prosleðenog id-ja iz baze podataka")
	@Transactional
	@DeleteMapping("tipRacuna/{id}")
	public ResponseEntity<TipRacuna> deleteTipRacuna(@PathVariable("id") Integer id) {
		if(!tpRepository.existsById(id)) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM racun WHERE tip_racuna = " + id);
		tpRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"tip_racuna\"(\"id\", \"naziv\", \"oznaka\", \"opis\") "
					+ "VALUES (-100, 'Naziv Test', 'Oznaka Test', 'Opis Test')" 
					);
		}
		
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}

}
