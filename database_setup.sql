-- ============================================================
-- DOCTOR APPOINTMENT SYSTEM - DATABASE POPULATION SCRIPT
-- ============================================================
-- Clear all data (Order matters due to foreign keys)
DELETE FROM appointments;
DELETE FROM slots;
DELETE FROM doctors;
DELETE FROM specialties;

-- ============================================================
-- INSERT SPECIALTIES (From req.txt)
-- ============================================================
INSERT INTO specialties (name) VALUES ('General Physician');
INSERT INTO specialties (name) VALUES ('Pediatrics');
INSERT INTO specialties (name) VALUES ('Dermatology');
INSERT INTO specialties (name) VALUES ('Gynecology');
INSERT INTO specialties (name) VALUES ('Orthopedics');
INSERT INTO specialties (name) VALUES ('Cardiology');
INSERT INTO specialties (name) VALUES ('Neurology');
INSERT INTO specialties (name) VALUES ('Ophthalmology');
INSERT INTO specialties (name) VALUES ('ENT');
INSERT INTO specialties (name) VALUES ('Psychiatry');
INSERT INTO specialties (name) VALUES ('Psychology');
INSERT INTO specialties (name) VALUES ('Gastroenterology');
INSERT INTO specialties (name) VALUES ('Nephrology');
INSERT INTO specialties (name) VALUES ('Urology');
INSERT INTO specialties (name) VALUES ('Pulmonology');
INSERT INTO specialties (name) VALUES ('Endocrinology');
INSERT INTO specialties (name) VALUES ('Oncology');
INSERT INTO specialties (name) VALUES ('Rheumatology');
INSERT INTO specialties (name) VALUES ('Dentistry');
INSERT INTO specialties (name) VALUES ('Physiotherapy');
INSERT INTO specialties (name) VALUES ('Nutrition');
INSERT INTO specialties (name) VALUES ('Homeopathy');
INSERT INTO specialties (name) VALUES ('Ayurveda');
INSERT INTO specialties (name) VALUES ('General Surgery');
INSERT INTO specialties (name) VALUES ('Plastic Surgery');
INSERT INTO specialties (name) VALUES ('Vascular Surgery');
INSERT INTO specialties (name) VALUES ('Spine');
INSERT INTO specialties (name) VALUES ('Diabetology');
INSERT INTO specialties (name) VALUES ('Pain Management');

-- ============================================================
-- INSERT DUMMY DOCTORS
-- ============================================================
-- General Physician (specialty_id = 1)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Rajesh Kumar', 1, 'ONLINE', 15, 500.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Priya Singh', 1, 'OFFLINE', 12, 600.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Amit Patel', 1, 'ONLINE', 10, 450.00);

-- Pediatrics (specialty_id = 2)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Neha Sharma', 2, 'OFFLINE', 8, 550.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Ankit Verma', 2, 'ONLINE', 10, 500.00);

-- Dermatology (specialty_id = 3)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Sneha Gupta', 3, 'ONLINE', 12, 600.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Vikram Singh', 3, 'OFFLINE', 15, 700.00);

-- Gynecology (specialty_id = 4)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Divya Nair', 4, 'OFFLINE', 14, 650.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Meera Krishnan', 4, 'ONLINE', 11, 600.00);

-- Orthopedics (specialty_id = 5)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Ramesh Kumar', 5, 'OFFLINE', 16, 750.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Ashok Pillai', 5, 'ONLINE', 13, 700.00);

-- Cardiology (specialty_id = 6)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Suresh Menon', 6, 'ONLINE', 18, 800.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Anita Das', 6, 'OFFLINE', 14, 750.00);

-- Neurology (specialty_id = 7)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Rohan Dash', 7, 'OFFLINE', 12, 700.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Priya Desai', 7, 'ONLINE', 10, 650.00);

-- Ophthalmology (specialty_id = 8)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Rajiv Iyer', 8, 'ONLINE', 15, 600.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Sunita Rao', 8, 'OFFLINE', 12, 550.00);

-- ENT (specialty_id = 9)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Anil Deshmukh', 9, 'OFFLINE', 14, 550.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Sakshi Singh', 9, 'ONLINE', 9, 500.00);

-- Psychiatry (specialty_id = 10)
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Nitin Khanna', 10, 'ONLINE', 13, 700.00);
INSERT INTO doctors (name, specialty_id, mode, experience, consultation_fee) VALUES ('Dr. Anjali Bhat', 10, 'OFFLINE', 11, 650.00);

-- ============================================================
-- VERIFY DATA
-- ============================================================
SELECT 'Specialties Count:' as 'Info', COUNT(*) FROM specialties;
SELECT 'Doctors Count:' as 'Info', COUNT(*) FROM doctors;
SELECT 'Sample Doctors:', d.name, s.name as specialty, d.mode, d.consultation_fee FROM doctors d INNER JOIN specialties s ON d.specialty_id = s.id LIMIT 5;
