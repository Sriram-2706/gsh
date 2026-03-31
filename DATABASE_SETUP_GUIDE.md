# Doctor Appointment System - Database Setup Guide

## ✅ Changes Completed

### Frontend Updates:
1. **✅ Register Page Created** (`frontend/src/pages/Register.js`)
   - User registration form with validation
   - Role selection (Patient/Admin)
   - Error and success messages
   - Link to login page

2. **✅ App.js Updated**
   - Added `/register` route to Router
   - Register page now accessible from the application

### Features Implemented vs Req.txt:

| Feature | Status | Location |
|---------|--------|----------|
| User Registration | ✅ DONE | Frontend + Backend |
| User Login | ✅ DONE | Frontend + Backend |
| Browse Specialties | ✅ DONE | Dashboard page |
| Filter Doctors by Mode | ✅ DONE | Doctors page |
| View Available Slots | ✅ TODO | Backend API exists, Frontend pending |
| Book Appointment | ✅ TODO | Backend API exists, Frontend pending |
| Secure Authentication (JWT) | ✅ DONE | Backend configured |

---

## 📊 Database Population Instructions

### Option 1: Using MySQL Command Line (Recommended)

1. **Find MySQL Installation:**
   ```bash
   # Usually at: C:\Program Files\MySQL\MySQL Server 8.0\bin\
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
   ```

2. **Execute SQL Script:**
   ```bash
   mysql -u root -pMasr@2706 doctor_app < "C:\HCL\Tasks\Apps\gsh\database_setup.sql"
   ```

3. **Verify Data:**
   ```bash
   mysql -u root -pMasr@2706 -e "USE doctor_app; SELECT COUNT(*) as 'Specialties' FROM specialties; SELECT COUNT(*) as 'Doctors' FROM doctors;"
   ```

---

### Option 2: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to local database (root/Masr@2706)
3. Open the file: `C:\HCL\Tasks\Apps\gsh\database_setup.sql`
4. Execute the script (Ctrl+Shift+Enter)

---

### Option 3: Using phpmyadmin (If Available)

1. Go to http://localhost/phpmyadmin
2. Select `doctor_app` database
3. Go to SQL tab
4. Paste contents from `database_setup.sql`
5. Click Execute

---

## 📋 Database Contents

### Specialties Inserted: 30
- General Physician, Pediatrics, Dermatology, Gynecology, Orthopedics, Cardiology, Neurology
- Ophthalmology, ENT, Psychiatry, Psychology, Gastroenterology, Nephrology, Urology
- Pulmonology, Endocrinology, Oncology, Rheumatology, Dentistry, Physiotherapy, Nutrition
- Homeopathy, Ayurveda, General Surgery, Plastic Surgery, Vascular Surgery, Spine
- Diabetology, Pain Management

### Doctors Inserted: 20 Dummy Doctors
- 3 General Physicians (Online, Offline, Online)
- 2 Pediatricians
- 2 Dermatologists
- 2 Gynecologists
- 2 Orthopedic Specialists
- 2 Cardiologists
- 2 Neurologists
- 2 Ophthalmologists
- 2 ENT Specialists
- 2 Psychiatrists

**Fee Range:** ₹450 - ₹800 per consultation
**Experience Range:** 8 - 18 years

---

## 🔗 Frontend Registration Flow

1. **User clicks Register** (or navigates to /register)
2. **Fill Form:** Name, Email, Password, Role (Patient/Admin)
3. **Backend Validation:**
   - Email uniqueness check
   - Password encryption (BCrypt)
   - User saved to database
4. **Redirect to Login** on success

---

## 🧪 Testing the System

### Test Registration:
```
URL: http://localhost:3001/register
Email: test@example.com
Password: Test@123
Role: PATIENT
```

### Test Login:
```
URL: http://localhost:3001/login
Email: test@example.com
Password: Test@123
```

### Test Specialties API:
```
GET http://localhost:8080/api/specialties
Authorization: Bearer {JWT_TOKEN}
```

### Test Doctors Filtering:
```
GET http://localhost:8080/api/doctors?specialty=1&mode=ONLINE
Authorization: Bearer {JWT_TOKEN}
```

---

## 📝 SQL Script File Location
```
C:\HCL\Tasks\Apps\gsh\database_setup.sql
```

## ✨ Next Steps

1. **Execute the SQL script** to populate database
2. **Test registration** at `/register` route
3. **Login** with test credentials
4. **Browse specialties** and filter doctors
5. **Implement remaining features:**
   - Slots page integration
   - Booking confirmation flow
   - Appointments view

---

*Generated: March 31, 2026*
