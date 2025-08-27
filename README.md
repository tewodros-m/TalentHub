# TalentHub API Documentation

| Endpoint                                | Method | Role      | Request Body / Params               | Description                                                      |
| --------------------------------------- | ------ | --------- | ----------------------------------- | ---------------------------------------------------------------- |
| `/auth/register`                        | POST   | Public    | `{ name, email, password, role? }`  | Register a new user                                              |
| `/auth/login`                           | POST   | Public    | `{ email, password }`               | Login user                                                       |
| `/jobs`                                 | GET    | Public    | `search?`                           | List all jobs (search optional)                                  |
| `/jobs/:id`                             | GET    | Public    | `id` (param)                        | Get job by ID                                                    |
| `/jobs/employer`                        | GET    | Employer  | JWT required                        | Get all jobs created by employer                                 |
| `/jobs`                                 | POST   | Employer  | `{ title, description, skills? }`   | Create a new job                                                 |
| `/jobs/:id`                             | PATCH  | Employer  | `{ title?, description?, skills? }` | Update a job                                                     |
| `/jobs/:id`                             | DELETE | Employer  | `id` (param)                        | Delete a job                                                     |
| `/applications`                         | POST   | Applicant | FormData: `jobId`, `resume` (file)  | Apply to a job with resume                                       |
| `/applications/:userId`                 | GET    | Applicant | `userId` (param)                    | Get applications for a user                                      |
| `/admin/jobs`                           | GET    | Admin     | JWT required                        | List all jobs with number of applications                        |
| `/admin/applications`                   | GET    | Admin     | JWT required                        | List all applications                                            |
| `/admin/applications/:id`               | PATCH  | Admin     | `{ status }`                        | Update application status (`applied`, `shortlisted`, `rejected`) |
| `/admin/analytics/applications-per-job` | GET    | Admin     | JWT required                        | Get number of applications per job                               |

---

### Notes:

- **JWT**: All protected routes require `Authorization: Bearer <token>` header.
- **Roles**: `applicant`, `employer`, `admin`.
