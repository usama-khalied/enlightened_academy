package com.enlightened.technologies.academy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "course")
@NoArgsConstructor
public class Course implements Serializable{

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "name", length = 500)
    private String name;

    @Column(name = "description", length = 1000)
    private String description;
    
    @Column(name = "fee", length = 20)
    private double fee;
    
    @Column(name = "url", length = 100)
    private String url;
    
    @OneToMany(mappedBy = "course",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Enrollment> enrollments;

}
