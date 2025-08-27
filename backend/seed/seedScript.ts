/// <reference types="node" />

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../src/models/UserModel';
import { Job } from '../src/models/JobModel';
import { jobs } from './jobs';

dotenv.config({ path: '.env' });

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear old data
    // await User.deleteMany({});
    // await Job.deleteMany({});

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@talenthub.com',
      password: 'password123',
      role: 'admin',
    });

    // Create Employer
    const employer = await User.create({
      name: 'Employer One',
      email: 'employer@talenthub.com',
      password: 'password123',
      role: 'employer',
    });

    // Create Applicants
    const applicant1 = await User.create({
      name: 'Applicant One',
      email: 'applicant1@talenthub.com',
      password: 'password123',
      role: 'applicant',
    });

    const applicant2 = await User.create({
      name: 'Applicant Two',
      email: 'applicant2@talenthub.com',
      password: 'password123',
      role: 'applicant',
    });

    // Insert jobs linked to employer
    const jobsWithEmployer = jobs.map((job) => ({
      ...job,
      createdBy: employer._id,
    }));
    await Job.insertMany(jobsWithEmployer);

    console.log('Seeded: 1 Admin, 1 Employer, 2 Applicants, 10 Jobs');
    console.log('Login with:');
    console.log('Admin:', admin.email, 'password123');
    console.log('Employer:', employer.email, 'password123');
    console.log('Applicant1:', applicant1.email, 'password123');
    console.log('Applicant2:', applicant2.email, 'password123');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
})();
