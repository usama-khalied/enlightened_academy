/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.enlightened.technologies.academy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author hasan
 */
@Entity
@Data
@Table(name = "student")
@NoArgsConstructor
public class Student implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "firstname", length = 500)
    private String firstName;

    @Column(name = "lastname", length = 500)
    private String LastName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "address", length = 1000)
    private String address;

    @Column(name = "phone", length = 11)
    private String phoneNumber;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "age", length = 10)
    private Integer age;

    @Column(name = "birthdate", length = 50)
    private String birthDate;
    
    @Column(name = "cnic", length = 13)
    private String cnic;
    
    @Column(name = "parentcnic", length = 13)
    private String parentCnic;

    @Column(name = "qualification", length = 50)
    private String qualification;

    @OneToMany(mappedBy = "student")
//    @JsonIgnore
    private List<Enrollment> enrollments;

}
