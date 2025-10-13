package com.coforge.project.shoppe.model;

import jakarta.persistence.*;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.Base64;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * Author    : Sonu.2
 * Date      : Oct 3, 2025
 * Project   : pms-restapi
 * Description: Model class for Registration of Users with 1-1 Mapping with Address
 */

@Getter
@Entity
@Table(name = "users")
@Data
public class User {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Setter
    @Column(name = "first_name", nullable = false)
    private String fname;

    @Column(name = "last_name", nullable = false)
    private String lname;

    @NotBlank(message = "Password can't be blank")
    @Size(min = 8, max = 255, message = "Password must be between 8 to 255 characters")
    @Column(nullable = false)
    private String password;

    @Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date dob;

    @Setter
    @Column(name = "phone", unique = true, nullable = false)
    private String phoneNo;

    // 1-1 Mapping with Address
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Address address;

    public User() {}

    public User(Long id, String email, String fname, String lname, String password, Date dob, String phoneNo) {
        this.id = id;
        this.email = email;
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.dob = dob;
        this.phoneNo = phoneNo;
    }



    public void setPassword(String password) {
        Base64.Encoder encoder = Base64.getEncoder();
        String encodedString = encoder.encodeToString(password.getBytes(StandardCharsets.UTF_8));
        this.password = encodedString;
    }

    public void setAddress(Address address) {
        this.address = address;
        if (address != null) {
            address.setUser(this); // maintain bidirectional relationship
        }
    }
}
