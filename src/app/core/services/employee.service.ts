import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EMPLOYEES_DATA } from '../../data/employees.data';

export interface SearchState {
  name: string;
  group: string;
}

const defaultSearchState: SearchState = {
  name: '',
  group: ''
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>(EMPLOYEES_DATA);
  employees$ = this.employeesSubject.asObservable();

  private searchStateSubject = new BehaviorSubject<SearchState>(defaultSearchState);
  searchState$ = this.searchStateSubject.asObservable();

  filteredEmployees$ = combineLatest([this.employees$, this.searchState$]).pipe(
    map(([employees, state]) =>
      employees
        .filter(e => {
          const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
          return fullName.includes(state.name.toLowerCase());
        })
        .filter(e => state.group ? e.group === state.group : true)
    )
  );

  updateSearchState(state: Partial<SearchState>): void {
    this.searchStateSubject.next({ ...this.searchStateSubject.value, ...state });
  }

  getSearchState(): SearchState {
    return this.searchStateSubject.value;
  }

  getById(id: string): Employee | undefined {
    return this.employeesSubject.value.find(e => e.id === id);
  }

  addEmployee(employee: Employee): void {
    const current = this.employeesSubject.value;
    this.employeesSubject.next([employee, ...current]);
  }

  updateEmployee(employee: Employee): void {
    const current = this.employeesSubject.value;
    const index = current.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = employee;
      this.employeesSubject.next(updated);
    }
  }

  deleteEmployee(id: string): void {
    const current = this.employeesSubject.value;
    this.employeesSubject.next(current.filter(e => e.id !== id));
  }
}
