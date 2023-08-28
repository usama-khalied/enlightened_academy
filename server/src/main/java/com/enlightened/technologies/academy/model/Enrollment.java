/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.enlightened.technologies.academy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author hasan
 */
@Entity
@Data
@Table(name = "enrollment")
@NoArgsConstructor
public class Enrollment implements Serializable{

    @Id
    @Column(name = "id", length = 100)
    private String id;


    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonBackReference
    private Student student;


    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;
}
