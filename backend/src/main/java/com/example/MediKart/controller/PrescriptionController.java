package com.example.MediKart.controller;

import com.example.MediKart.model.Prescription;
import com.example.MediKart.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    // 1️⃣ Upload prescription
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPrescription(
            @RequestParam("doctorName") String doctorName,
            @RequestParam("hospitalName") String hospitalName,
            @RequestParam("prescriptionDate") String prescriptionDate,
            @RequestParam("file") MultipartFile file) throws IOException {

        Prescription prescription = new Prescription();
        prescription.setDoctor(doctorName);
        prescription.setMedicine(hospitalName); // Assuming hospitalName = medicine, change if needed
        prescription.setPrescriptionDate(LocalDate.parse(prescriptionDate));
        prescription.setStatus("Pending");
        prescription.setFileName(file.getOriginalFilename());
        prescription.setFileType(file.getContentType());
        prescription.setFileData(file.getBytes());

        prescriptionRepository.save(prescription);
        return ResponseEntity.ok("Prescription uploaded successfully.");
    }

    // 2️⃣ View all prescriptions
    @GetMapping
    public List<Prescription> getAll() {
        return prescriptionRepository.findAll();
    }

    // 3️⃣ Download prescription file
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadPrescription(@PathVariable Long id) {
        Prescription pres = prescriptionRepository.findById(id).orElseThrow();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pres.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(pres.getFileType()))
                .body(pres.getFileData());
    }

    // 4️⃣ Delete prescription
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        prescriptionRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully.");
    }

    // 5️⃣ Reorder medicines (uses same prescription)
    @PostMapping("/reorder/{id}")
    public ResponseEntity<String> reorder(@PathVariable Long id) {
        Prescription pres = prescriptionRepository.findById(id).orElseThrow();
        pres.setStatus("Refilled");
        prescriptionRepository.save(pres);
        return ResponseEntity.ok("Medicines reordered using prescription #" + id);
    }
}
