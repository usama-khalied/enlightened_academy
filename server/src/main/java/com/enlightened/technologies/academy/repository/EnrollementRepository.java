package com.enlightened.technologies.academy.repository;

import com.enlightened.technologies.academy.model.Student;
import com.enlightened.technologies.academy.model.Enrollment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;



/**
 *
 * @author hasan
 */
public interface EnrollementRepository extends JpaRepository<Enrollment, String>{

    List<Enrollment> findByStudentId(@Param("studentId") String studentId);
}
