import { Employee } from '../models/employee.model';
import { GROUPS_DATA } from './groups.data';

const FIRST_NAMES = ['Budi', 'Siti', 'Andi', 'Dewi', 'Joko', 'Nina', 'Eko', 'Rini', 'Agus', 'Tari', 'Bagas', 'Maya'];
const LAST_NAMES = ['Santoso', 'Wijaya', 'Kusuma', 'Lestari', 'Saputra', 'Sari', 'Nugroho', 'Wahyuni', 'Setiawan', 'Pratama'];
const STATUSES = ['Active', 'Inactive'];

function generateEmployees(count: number): Employee[] {
  return Array.from({ length: count }, (_, i) => {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const group = GROUPS_DATA[Math.floor(Math.random() * GROUPS_DATA.length)];
    
    // Random date in the past 30-50 years
    const start = new Date(1970, 0, 1);
    const end = new Date(1995, 11, 31);
    const birthDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    // Random salary between 5,000,000 and 20,000,000
    const basicSalary = 5000000 + Math.floor(Math.random() * 15000000);

    return {
      id: crypto.randomUUID(),
      username: `user${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i+1}@company.com`,
      birthDate,
      basicSalary,
      status,
      group,
      description: `Employee record for ${firstName} ${lastName}`
    };
  });
}

export const EMPLOYEES_DATA: Employee[] = generateEmployees(100);
