package com.enlightened.technologies.academy.repository;
import com.enlightened.technologies.academy.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;



/**
 *
 * @author hasan
 */
public interface EnrollementRepository extends JpaRepository<Enrollment, String>{

    List<Enrollment> findByStudentId(@Param("studentId") String studentId);
}
