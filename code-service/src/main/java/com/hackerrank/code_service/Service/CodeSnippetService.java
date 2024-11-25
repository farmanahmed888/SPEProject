package com.hackerrank.code_service.Service;

import com.hackerrank.code_service.Entity.CodeSnippet;
import com.hackerrank.code_service.Repository.CodeSnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CodeSnippetService {
    @Autowired
    private CodeSnippetRepository codeSnippetRepository;

    public List<CodeSnippet> getAllCodeSnippets() {
        return codeSnippetRepository.findAll();
    }

    public Optional<CodeSnippet> getCodeSnippetById(Integer id) {
        return codeSnippetRepository.findById(id);
    }

    public CodeSnippet createOrUpdateCodeSnippet(CodeSnippet codeSnippet) {
        return codeSnippetRepository.save(codeSnippet);
    }

    public void deleteCodeSnippet(Integer id) {
        codeSnippetRepository.deleteById(id);
    }
}
