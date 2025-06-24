package com.ohdeardear.controller;

import com.ohdeardear.model.Entry;
import com.ohdeardear.repository.EntryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/entries")
public class EntryController {

    private final EntryRepository repo;

    public EntryController(EntryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Entry> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Entry create(@RequestBody Entry entry) {
        return repo.save(entry);
    }

    @PutMapping("/{id}")
    public Entry update(@PathVariable Long id, @RequestBody Entry updated) {
        return repo.findById(id).map(entry -> {
            entry.setTitle(updated.getTitle());
            entry.setContent(updated.getContent());
            entry.setDate(updated.getDate());
            return repo.save(entry);
        }).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
