# eGFR Calculator Web Application

This repository contains a modern web application for calculating estimated glomerular filtration rate (eGFR), tailored for healthcare settings. It is designed to demonstrate **in-house development** of a secure, standalone medical calculator hosted in the **cloud (e.g., AWS)**, with optional integration to Electronic Health Records (EHRs) via open APIs.

---

## Healthcare Context

eGFR is a key diagnostic tool for assessing kidney function. This app allows clinicians and patients to compute eGFR using validated formulas without the use of race, aligning with **equity-centered care**.

---

## Features

- Secure user authentication with JWT
- eGFR computation using CKD-EPI (without race)
- Patient/user log history with export options
- Admin dashboard for audit logging
- Optional integration to EHR via open standards (e.g., HL7 FHIR)
- GDPR & NIS2-friendly logging and access controls

---

## Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Frontend   | React (Vite)                  |
| Backend    | Node.js, Express              |
| Database   | MongoDB (local/Atlas)         |
| Auth       | JWT, bcrypt                   |
| Deployment | Netlify / Render / AWS EC2 or ECS |
| CI/CD      | GitHub Actions                |

---

## Deployment Options

| Component | Local Dev         | Cloud Deployment          |
|-----------|-------------------|----------------------------|
| Frontend  | `npm run dev`     | Netlify / AWS S3 + CloudFront |
| Backend   | `nodemon server.js` | Render / AWS ECS / EC2       |
| Database  | MongoDB local or Atlas | AWS DocumentDB             |

Refer to `/frontend/netlify.toml` and `Dockerfile` (if applicable) for configuration.

---

## CI/CD Pipeline

- GitHub Actions config to automate:
  - Linting & Testing
  - Build and Deploy (Netlify for frontend, Render for backend)
- Artifacts can be versioned and stored
- Environment variables defined in `.env.example`

---

## Compliance & Security (GDPR + NIS2)

| Area             | Practice/Feature                                                |
|------------------|------------------------------------------------------------------|
| Data Minimization | eGFR input fields limited to age, creatinine, sex              |
| Logging           | Role-based logs, time-stamped, exportable by admin only       |
| Consent/Audit     | Logs stored per user, exportable as audit trail               |
| Security          | JWT for auth, HTTPS endpoints, rate-limiting (optionally)     |
| Availability      | Cloud deployment with multi-zone redundancy                    |
| Breach Handling   | Integrated with AWS CloudWatch + SNS for alerting (optional)  |

Compliance Report is provided under `/docs/egfr_compliance_report.md`.

---

## Folder Structure




## CI/CD Pipeline

This project uses **GitHub Actions** to automate continuous integration and deployment for both frontend and backend, as well as infrastructure provisioning.

### How it works

- On every push or pull request to the `main` branch:
  - Run linting and tests for frontend and backend.
  - Build frontend static files.
- After successful tests on the main branch:
  - Deploy infrastructure via CloudFormation.
  - Deploy backend application.
  - Deploy frontend static site to S3 + invalidate CloudFront cache.

### Setup

1. Add your AWS credentials as **GitHub secrets**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

2. Update `deploy.yml` with your AWS region and S3 bucket name.

3. Ensure CloudFormation templates are valid and aligned with your infrastructure.

4. Push your code and monitor Actions tab for status.

---

This pipeline enforces **GDPR compliance** by removing the `race` parameter from the backend API.

---

### Notes

- Infrastructure includes VPC, ECS, ALB, S3, CloudFront, DynamoDB, and IAM roles.
- Backend and frontend are deployed separately for flexibility.
- Secrets are managed securely via GitHub Secrets and AWS Secrets Manager.


# Compliance Report for eGFR Application

**Assessment Date:** [YYYY-MM-DD]  
**Assessed by:** [Name]  
**Overall Compliance Score:** [XX]%

---

## Executive Summary

This report evaluates the eGFR application's compliance with NIS2 and GDPR regulations. The application demonstrates [Good / Moderate / Poor] compliance with [number]% of checklist items passed.

---

## Detailed Findings

| Category                | Score (%) | Notes on Compliance and Issues                  |
|-------------------------|-----------|------------------------------------------------|
| Governance & Risk Mgmt  | [XX]%     | [Summary of findings]                           |
| Data Protection         | [XX]%     | [Summary]                                       |
| Technical Security      | [XX]%     | [Summary]                                       |
| Data Subject Rights     | [XX]%     | [Summary]                                       |
| Third-party & API Sec   | [XX]%     | [Summary]                                       |
| Privacy by Design       | [XX]%     | [Summary]                                       |
| Compliance Documentation| [XX]%     | [Summary]                                       |

---

## Recommendations

- Immediate: [List critical fixes]
- Medium term: [List improvements]
- Long term: [Suggestions]

---

## Conclusion

The eGFR app meets essential requirements for data protection and security, with areas identified for enhancement to ensure full regulatory compliance and reduce risk.

---

## Appendix

- Checklist raw data  
- Glossary of terms

