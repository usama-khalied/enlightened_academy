package com.enlightened.technologies.academy.repository;

import com.enlightened.technologies.academy.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author hasan
 */
public interface EnrollementRepository extends JpaRepository<Enrollment, String>{
    
}
