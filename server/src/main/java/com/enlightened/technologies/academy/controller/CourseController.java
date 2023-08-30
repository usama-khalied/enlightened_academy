/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.enlightened.technologies.academy.controller;

import com.enlightened.technologies.academy.AcademyApplication;
import com.enlightened.technologies.academy.model.Course;
import com.enlightened.technologies.academy.repository.CourseRepository;
import com.enlightened.technologies.academy.utils.HttpResponse;
import com.enlightened.technologies.academy.utils.Logger;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

/**
 *
 * @author hasan
 */
@RestController
@RequestMapping("/courses/")
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping(path = {""}, name = "course-post", produces = "application/json")
    public ResponseEntity<HttpResponse> postCourse(HttpServletRequest request,
            @RequestBody Course bodyCourse) {

        //Logs
        String logPrefix = request.getRequestURI();
        HttpResponse response = new HttpResponse(request.getRequestURI());
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        //Check if Course already exists
        List<Course> courses = courseRepository.findAll();

        if (!courses.isEmpty()) {

            for (Course course : courses) {
                if (course.getName().equals(bodyCourse.getName())) {
                    Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, " Coourse Already Exists ");
                    response.setStatus(HttpStatus.CONFLICT);
                    response.setError("Course Already Exists");
                    return ResponseEntity.status(response.getStatus()).body(response);
                }
            }
        }

        //Save Course
        Course savedCourse = courseRepository.save(bodyCourse);

        //Set and Send Response
        response.setStatus(HttpStatus.CREATED);
        response.setData(savedCourse);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping(path = {""}, name = "course-get-all", produces = "application/json")
    public ResponseEntity<HttpResponse> getCourses(HttpServletRequest request) {

        String logPrefix = request.getRequestURI();
        HttpResponse response = new HttpResponse(request.getRequestURI());
        Logger.application.info(Logger.pattern, AcademyApplication.VERSION, logPrefix, "", "");

        List<Course> courses = courseRepository.findAll();

        //Set and Send Response
        response.setStatus(HttpStatus.OK);
        response.setData(courses);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

//  @GetMapping("/{courseId}") // Handles GET requests with a course ID in the path
//    public ResponseEntity<HttpResponse> getCourseById(@PathVariable String courseId) {
//        List<Course> optionalCourse = courseRepository.findByCourseId(courseId);
//
//        if (optionalCourse.isEmpty()) {
//            // Course not found, return an appropriate response
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//
//        // Create a response object
//        HttpResponse response = new HttpResponse("Course details for ID: " + courseId);
//        response.setStatus(HttpStatus.OK);
//        response.setData(optionalCourse);
//
//        return ResponseEntity.status(response.getStatus()).body(response);
//    }
}
