/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.enlightened.technologies.academy.controller;

import com.enlightened.technologies.academy.AcademyApplication;
import com.enlightened.technologies.academy.model.Student;
import com.enlightened.technologies.academy.repository.StudentRepository;
import com.enlightened.technologies.academy.utils.HttpResponse;
import com.enlightened.technologies.academy.utils.Logger;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
@RequestMapping("/students/")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping(path = {""}, name = "student-post", produces = "application/json")
    public ResponseEntity<HttpResponse> postStudent(HttpServletRequest request,
            @RequestBody Student newStudent) {
        String logPrefix = request.getRequestURI();
        HttpResponse response = new HttpResponse(request.getRequestURI());
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        if (isInvalidStudent(newStudent)) {
            return buildErrorResponse(response, logPrefix, "Invalid/Bad Request", HttpStatus.BAD_REQUEST);
        }

        List<Student> students = studentRepository.findAll();
        if (isDuplicateStudent(newStudent, students)) {
            return buildErrorResponse(response, logPrefix, "Email, Phone Number, or CNIC Already Exists", HttpStatus.CONFLICT);
        }

        try {
            Student savedStudent = studentRepository.save(newStudent);
            response.setStatus(HttpStatus.CREATED);
            response.setData(savedStudent);
            return ResponseEntity.status(response.getStatus()).body(response);
        } catch (Exception e) {
            return buildErrorResponse(response, logPrefix, "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean isInvalidStudent(Student student) {
        return student.getFirstName() == null
                || student.getLastName() == null
                || student.getEmail() == null
                || student.getPhoneNumber() == null
                || student.getAddress() == null
                || student.getCnic() == null
                || student.getBirthDate() == null
                || student.getPhoneNumber() == null;
    }

    private boolean isDuplicateStudent(Student newStudent, List<Student> students) {
        Set<String> emailSet = new HashSet<>();
        Set<String> phoneNumberSet = new HashSet<>();
        Set<String> cnicSet = new HashSet<>();

        for (Student student : students) {
            if (!emailSet.add(student.getEmail())
                    || !phoneNumberSet.add(student.getPhoneNumber())
                    || !cnicSet.add(student.getCnic())) {
                return true;
            }
        }

        return !emailSet.add(newStudent.getEmail())
                || !phoneNumberSet.add(newStudent.getPhoneNumber())
                || !cnicSet.add(newStudent.getCnic());
    }

    private ResponseEntity<HttpResponse> buildErrorResponse(HttpResponse response, String logPrefix, String errorMessage, HttpStatus httpStatus) {
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, errorMessage);
        response.setStatus(httpStatus);
        response.setError(errorMessage);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping(path = {"/find/"}, name = "student-get", produces = "application/json")
    public ResponseEntity<HttpResponse> getStudent(HttpServletRequest request,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String cnic
    ) {

        String logPrefix = "/students";
        HttpResponse response = new HttpResponse(logPrefix);
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        if (email != null && isDuplicateField(email, "Email")) {
            return buildErrorResponse(response, logPrefix, "Email Already Exists", HttpStatus.CONFLICT);
        }

        if (phoneNumber != null && isDuplicateField(phoneNumber, "Phone Number")) {
            return buildErrorResponse(response, logPrefix, "Phone Number Already Exists", HttpStatus.CONFLICT);
        }

        if (cnic != null && isDuplicateField(cnic, "CNIC")) {
            return buildErrorResponse(response, logPrefix, "CNIC Already Exists", HttpStatus.CONFLICT);
        }

        //Set and Send Response
        response.setStatus(HttpStatus.OK);
        response.setData("No Student Found");
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    private boolean isDuplicateField(String fieldValue, String fieldName) {
        List<Student> students = studentRepository.findAll();

        for (Student student : students) {
            if (fieldValue.equals(student.getEmail())
                    || fieldValue.equals(student.getPhoneNumber())
                    || fieldValue.equals(student.getCnic())) {
                Logger.application.info(Logger.pattern, AcademyApplication.VERSION, "/students", fieldName + " Already Exists");
                return true;
            }
        }

        return false;
    }

    @GetMapping(path = {""}, name = "student-get-all", produces = "application/json")
    public ResponseEntity<HttpResponse> getStudents(HttpServletRequest request) {

        String logPrefix = request.getRequestURI();
        HttpResponse response = new HttpResponse(request.getRequestURI());
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        List<Student> students = studentRepository.findAll();

        //Set and Send Response
        response.setStatus(HttpStatus.OK);
        response.setData(students);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

}
