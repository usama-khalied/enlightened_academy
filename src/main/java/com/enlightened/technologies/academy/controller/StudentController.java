/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.enlightened.technologies.academy.controller;

import com.enlightened.technologies.academy.AcademyApplication;
import com.enlightened.technologies.academy.model.Course;
import com.enlightened.technologies.academy.model.Student;
import com.enlightened.technologies.academy.repository.CourseRepository;
import com.enlightened.technologies.academy.repository.StudentRepository;
import com.enlightened.technologies.academy.utils.HttpResponse;
import com.enlightened.technologies.academy.utils.Logger;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping("/students/")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping(path = {""}, name = "student-post", produces = "application/json")
    public ResponseEntity<HttpResponse> postStudent(HttpServletRequest request,
            @RequestBody Student bodyStudent) {
        //Logs
        String logPrefix = request.getRequestURI();
        HttpResponse response = new HttpResponse(request.getRequestURI());
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        //Save student
        Student savedStudent = studentRepository.save(bodyStudent);

        //Set and Send Response
        response.setStatus(HttpStatus.CREATED);
        response.setData(savedStudent);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping(path = {""}, name = "student-get-all", produces = "application/json")
    public ResponseEntity<HttpResponse> getCourse(HttpServletRequest request) {

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
