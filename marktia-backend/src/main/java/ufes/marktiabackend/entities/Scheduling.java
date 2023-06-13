package ufes.marktiabackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ufes.marktiabackend.enums.SchedulingStatus;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "scheduling")
public class Scheduling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    @OneToOne
    @JoinColumn(name = "consumer_id")
    private User consumer;

    @OneToOne
    @JoinColumn(name = "provider_id")
    private User provider;

    private SchedulingStatus status;

    @Column(name = "dt_creation", insertable = false)
    private LocalDate creationDate;

    @Column(name = "dt_completion")
    private LocalDate completionDate;

    @OneToOne(mappedBy = "scheduling")
    private Evaluation evaluation;
}
