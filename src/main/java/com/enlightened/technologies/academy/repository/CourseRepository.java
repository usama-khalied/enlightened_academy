/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.enlightened.technologies.academy.repository;

import com.enlightened.technologies.academy.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author hasan
 */
public interface CourseRepository extends JpaRepository<Course, String> {

}
