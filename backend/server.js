import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'db.json');
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

app.use(cors({ origin: FRONTEND_URL === '*' ? true : FRONTEND_URL }));
app.use(express.json());

const readDatabase = async () => {
  const data = await fs.readJson(dbPath);
  return data.companies || [];
};

const writeDatabase = async (companies) => {
  await fs.writeJson(dbPath, { companies }, { spaces: 2 });
};

app.get('/', (_req, res) => {
  res.json({
    message: 'CompanyHub API is running',
    endpoints: ['GET /companies', 'POST /companies', 'DELETE /companies/:id']
  });
});

app.get('/companies', async (_req, res) => {
  try {
    const companies = await readDatabase();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch companies', error: error.message });
  }
});

app.post('/companies', async (req, res) => {
  try {
    const { name, location, industry } = req.body;

    if (!name || !location || !industry) {
      return res.status(400).json({ message: 'name, location, and industry are required' });
    }

    const companies = await readDatabase();
    const newCompany = {
      id: companies.length ? Math.max(...companies.map((company) => company.id)) + 1 : 1,
      name,
      location,
      industry
    };

    companies.push(newCompany);
    await writeDatabase(companies);

    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add company', error: error.message });
  }
});

app.delete('/companies/:id', async (req, res) => {
  try {
    const companyId = Number(req.params.id);
    const companies = await readDatabase();
    const companyToDelete = companies.find((company) => company.id === companyId);

    if (!companyToDelete) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const updatedCompanies = companies.filter((company) => company.id !== companyId);
    await writeDatabase(updatedCompanies);

    res.status(200).json({ message: 'Company deleted successfully', company: companyToDelete });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete company', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`CompanyHub backend running on port ${PORT}`);
});
