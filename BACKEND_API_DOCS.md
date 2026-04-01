# Hospital Scheduling System - Backend API Documentation

## Project Overview
This is a Spring Boot-based Hospital Scheduling System (HMS) that manages doctors, specialties, appointment slots, and patient appointments with JWT authentication.

## Architecture
The project follows a modular architecture:
- **Entities**: Core domain models (User, Doctor, Specialty, Slot, Appointment)
- **Repositories**: Data access layer with JPA interfaces
- **Services**: Business logic layer with CRUD operations
- **Controllers**: REST API endpoints
- **DTOs**: Request/Response objects for API communication
- **Config**: Configuration classes (JWT, Security, Swagger, DataLoader)

## Technology Stack
- **Framework**: Spring Boot 4.0.5
- **Database**: MySQL
- **ORM**: JPA/Hibernate
- **Security**: Spring Security with JWT
- **API Documentation**: Swagger 3 (SpringDoc OpenAPI)
- **Build Tool**: Maven

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Specialty Endpoints
- `GET /api/specialties` - Get all specialties
- `GET /api/specialties/{id}` - Get specialty by ID
- `POST /api/specialties` - Create new specialty
- `PUT /api/specialties/{id}` - Update specialty
- `DELETE /api/specialties/{id}` - Delete specialty

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/{id}` - Get doctor by ID
- `GET /api/doctors/specialty/{specialtyId}` - Get doctors by specialty
- `GET /api/doctors/mode/{mode}` - Get doctors by consultation mode
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/{id}` - Update doctor
- `DELETE /api/doctors/{id}` - Delete doctor

### Slot Endpoints
- `GET /api/slots` - Get all slots
- `GET /api/slots/{id}` - Get slot by ID
- `GET /api/slots/doctor/{doctorId}` - Get slots for a doctor
- `GET /api/slots/doctor/{doctorId}/available` - Get available slots for a doctor
- `GET /api/slots/doctor/{doctorId}/available-range?startDate=xxx&endDate=xxx` - Get available slots within date range
- `POST /api/slots` - Create new slot
- `PUT /api/slots/{id}` - Update slot
- `DELETE /api/slots/{id}` - Delete slot

### Appointment Endpoints
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `GET /api/appointments/patient/{patientId}` - Get patient appointments
- `GET /api/appointments/patient/{patientId}/status/{status}` - Get patient appointments by status
- `GET /api/appointments/doctor/{doctorId}` - Get doctor appointments
- `GET /api/appointments/doctor/{doctorId}/status/{status}` - Get doctor appointments by status
- `POST /api/appointments` - Create new appointment
- `PATCH /api/appointments/{id}/status/{status}` - Update appointment status
- `POST /api/appointments/{id}/cancel` - Cancel appointment

## Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password
- role (PATIENT, ADMIN, DOCTOR)

### Specialties Table
- id (Primary Key)
- name

### Doctors Table
- id (Primary Key)
- name
- specialty_id (Foreign Key → Specialties)
- mode (Online/Offline)
- experience (years)
- consultationFee

### Slots Table
- id (Primary Key)
- doctor_id (Foreign Key → Doctors)
- startTime
- endTime
- isBooked

### Appointments Table
- id (Primary Key)
- patient_id (Foreign Key → Users)
- doctor_id (Foreign Key → Doctors)
- slot_id (Foreign Key → Slots)
- mode
- status (SCHEDULED, COMPLETED, CANCELLED)
- bookingTime

## How to Run

### Prerequisites
- Java 21
- MySQL Server running
- Maven installed

### Setup Steps

1. **Update Database Configuration** (if needed)
   - Edit `backend/src/main/resources/application.properties`
   - Update `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`

2. **Build the Project**
   ```bash
   cd backend
   mvn clean install
   ```

3. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the APIs**
   - Main URL: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`
   - API Docs: `http://localhost:8080/v3/api-docs`

## Sample Data
The application automatically loads sample data on startup:
- **5 Specialties**: Cardiology, Dermatology, Neurology, Orthopedics, Pediatrics
- **4 Doctors**: Various specialties with different modes (Online/Offline)
- **Available Slots**: Multiple slots per doctor for the next 5 days
- **Sample Users**: Patients and Admin for testing

## Error Handling
- All endpoints return appropriate HTTP status codes
- Error responses include descriptive messages
- 400 - Bad Request
- 404 - Not Found
- 500 - Internal Server Error

## Future Enhancements
- Payment processing integration
- Email notifications for appointments
- Appointment reminders
- Doctor availability calendar view
- Patient medical history management
- Review and rating system
- Prescription management
