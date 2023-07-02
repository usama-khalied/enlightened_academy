/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.enlightened.technologies.academy.controller;

import com.enlightened.technologies.academy.AcademyApplication;
import com.enlightened.technologies.academy.model.Course;
import com.enlightened.technologies.academy.model.CourseList;
import com.enlightened.technologies.academy.model.Enrollment;
import com.enlightened.technologies.academy.model.Student;
import com.enlightened.technologies.academy.repository.CourseRepository;
import com.enlightened.technologies.academy.repository.StudentRepository;
import com.enlightened.technologies.academy.repository.EnrollementRepository;
import com.enlightened.technologies.academy.utils.HttpResponse;
import com.enlightened.technologies.academy.utils.Logger;
import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hasan
 */
@RestController
@RequestMapping("/enrollments/")
@CrossOrigin("*")
public class EnrollmentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollementRepository enrollmentRepository;

    @PostMapping(path = {""}, name = "enrollment-post", produces = "application/json")
    public ResponseEntity<HttpResponse> postEnrollment(HttpServletRequest request,
            @RequestParam(name = "studentId", required = true) String studentId, @RequestBody List<CourseList> requestBody) {
        //Logs
        String logPrefix = request.getRequestURI();
        HttpResponse response = new HttpResponse(request.getRequestURI());
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        //Fetch Courses all courses
        List<Course> courses = courseRepository.findAll();

        //Check if Student is valid
        Optional<Student> optionalStudent = studentRepository.findById(studentId);

        if (!optionalStudent.isPresent()) {
            Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "NOT_FOUND: " + studentId);
            response.setStatus(HttpStatus.NOT_FOUND);
            response.setError("Student Not Found");
            return ResponseEntity.status(response.getStatus()).body(response);
        }

        //Check if Courses are valid
        List<Enrollment> savedEnrollmentList = new ArrayList<>();
        
        for (CourseList requestCourse : requestBody) {

            Optional<Course> getCourse = courseRepository.findById(requestCourse.getId());

            if (!getCourse.isPresent()) {
                Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "NOT_FOUND: " + requestCourse.getId());
                response.setStatus(HttpStatus.NOT_FOUND);
                response.setError("Invalid Course in Request");
                return ResponseEntity.status(response.getStatus()).body(response);
            }

            //Create Composite Key
            String compositeKey = studentId + "-" + requestCourse.getId();
            //Check if enrollment is present        
            Optional<Enrollment> optionalEnrollment = enrollmentRepository.findById(compositeKey);

            if (optionalEnrollment.isPresent()) {
                Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "CONFLICT");
                response.setStatus(HttpStatus.CONFLICT);
                response.setError("Already Registred to : " + getCourse.get().getName());
                return ResponseEntity.status(response.getStatus()).body(response);
            }

            Enrollment createEnrollment = new Enrollment();
            createEnrollment = new Enrollment();
            createEnrollment.setId(compositeKey);
            createEnrollment.setCourse(getCourse.get());
            createEnrollment.setStudent(optionalStudent.get());

            //Saved Enrollment
            savedEnrollmentList.add(enrollmentRepository.save(createEnrollment));

        }

        //Set and Send Response
        response.setStatus(HttpStatus.CREATED);
        response.setData(savedEnrollmentList);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping(path = {""}, name = "enrollment-get-all", produces = "application/json")
    public ResponseEntity<HttpResponse> getEnrollments(HttpServletRequest request) {

        String logPrefix = request.getRequestURI();
        HttpResponse response = new HttpResponse(request.getRequestURI());
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        List<Enrollment> enrollments = enrollmentRepository.findAll();

        //Set and Send Response
        response.setStatus(HttpStatus.OK);
        response.setData(enrollments);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

}
