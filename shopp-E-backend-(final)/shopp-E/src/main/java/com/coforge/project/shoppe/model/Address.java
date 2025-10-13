package com.coforge.project.shoppe.model;

import jakarta.persistence.*;

/**
 * Author    : Sonu.2
 * Date      : Oct 3, 2025
 * Project   : pms-restapi
 * Description: Address model for storing user address
 */

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String city;

    private int pincode;

    // Foreign key reference to User
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "uid")
    private User user;

    public Address() {}

    public Address(String street, String city, int pincode) {
        this.street = street;
        this.city = city;
        this.pincode = pincode;
    }

    // Getters and Setters

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPincode() {
        return pincode;
    }

    public void setPincode(int pincode) {
        this.pincode = pincode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}