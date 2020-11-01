
-- Student Registration System DB schema definitions in MS SQL Server

CREATE DATABASE srs_db;
GO

CREATE TABLE srs_db.dbo.student_enrollment
(
    student_internal_id UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
    student_enrollment_id VARCHAR(40) NOT NULL,
    student_first_name VARCHAR(40) NOT NULL,
    student_last_name VARCHAR(40) NOT NULL,
    student_section VARCHAR(10) NOT NULL,
    nationality varchar(20) NOT NULL,
    status VARCHAR(5) NOT NULL,
    remarks VARCHAR(100) NULL,
    update_date_time DATETIMEOFFSET NULL,
    enrollment_date_time DATETIMEOFFSET NOT NULL,
);
GO
