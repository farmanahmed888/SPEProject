package com.hackerrank.code_service.Controller;

import com.hackerrank.code_service.Entity.CodeSnippet;
import com.hackerrank.code_service.Service.CodeSnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/codesnippets")
public class CodeSnippetController {
    @Autowired
    private CodeSnippetService codeSnippetService;

    @GetMapping
    public List<CodeSnippet> getAllCodeSnippets() {
        return codeSnippetService.getAllCodeSnippets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodeSnippet> getCodeSnippetById(@PathVariable Integer id) {
        return codeSnippetService.getCodeSnippetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CodeSnippet createCodeSnippet(@RequestBody CodeSnippet codeSnippet) {
        return codeSnippetService.createOrUpdateCodeSnippet(codeSnippet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodeSnippet> updateCodeSnippet(@PathVariable Integer id, @RequestBody CodeSnippet codeSnippet) {
        return codeSnippetService.getCodeSnippetById(id)
                .map(existingSnippet -> {
                    existingSnippet.setTitle(codeSnippet.getTitle());
                    existingSnippet.setContent(codeSnippet.getContent());
                    existingSnippet.setLanguage(codeSnippet.getLanguage());
                    return ResponseEntity.ok(codeSnippetService.createOrUpdateCodeSnippet(existingSnippet));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodeSnippet(@PathVariable Integer id) {
        if (codeSnippetService.getCodeSnippetById(id).isPresent()) {
            codeSnippetService.deleteCodeSnippet(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
