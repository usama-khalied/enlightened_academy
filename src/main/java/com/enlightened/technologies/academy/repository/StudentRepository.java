package com.enlightened.technologies.academy.repository;

import com.enlightened.technologies.academy.model.Student;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author hasan
 */
public interface StudentRepository extends JpaRepository<Student, String> {

    List<Student> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);
}
