package com.hackerrank.code_service.Repository;

import com.hackerrank.code_service.Entity.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Integer> {
}

