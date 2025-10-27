package com.aquaticket.aquaticketback.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 120, nullable = false, unique = true)
    private String email;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50)
    private String nickname;

    @Column(length = 20)
    private String phone;

    @Column(name = "password_hash", length = 60)
    private String passwordHash;

    private String provider;
    private String providerId;

    @Column(length = 20, nullable = false)
    private String role;
}