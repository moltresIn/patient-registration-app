# Patient Registration App (React + PGlite)

A frontend-only patient registration application with multi-step form that uses PGlite (PostgreSQL in the browser) for data storage.

## Features

- 🏥 **Multi-step Patient Registration**
- 📋 **Patient Management**
- 🔍 **SQL Query Interface**
- 💾 **Data Persistence**

## Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/
├── utils/
└── components/
    ├── formSteps/
    │   ├── PersonalInfo.jsx
    │   ├── ContactInfo.jsx
    │   ├── AddressInfo.jsx
    │   ├── EmergencyInfo.jsx
    │   ├── MedicalInfo.jsx
    │   └── ReviewInfo.jsx
    ├── PatientList.jsx
    ├── PatientTable.jsx
    ├── PatientRegistration.jsx
    ├── ProgressSteps.jsx
    └── SqlQuery.jsx
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn or npm

### Installation

```bash
git clone https://github.com/moltresIn/patient-registration-app.git
cd patient-registration-app
yarn install
yarn dev
```

## Usage

1. **Register a New Patient**:

   - Complete all form steps
   - Click "Submit"

2. **View Patients**:

   - Navigate to "Patient List" tab
   - Browse and filter records

3. **Run SQL Queries**:
   - Go to "SQL Query" tab
   - Enter query (e.g. `SELECT * FROM patients WHERE age > 30`)
   - Click "Execute"

## Development Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `yarn dev`     | Start development server |
| `yarn build`   | Create production build  |
| `yarn lint`    | Run ESLint               |
| `yarn preview` | Preview production build |

## Browser Support

✅ Chrome  
✅ Firefox  
✅ Edge
