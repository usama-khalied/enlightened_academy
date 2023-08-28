/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.enlightened.technologies.academy.model;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.enlightened.technologies.academy.model.Student;
/**
 *
 * @author Usama Khalid
 */
@Data
@NoArgsConstructor
public class EnrollmentList {
    private String courseName;
    private Double fee;
    private Student student;
}
