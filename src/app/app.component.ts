import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as XLSX from 'xlsx';
 
export interface User {
  id: number;
  username: string;
  status: string;
  log: string;
}

const USER_DATA: User[] = [
  { id: 1, username: 'john_doe', status: 'Active', log: 'Logged in at 9:00 AM' },
  { id: 2, username: 'jane_smith', status: 'Inactive', log: 'Logged out at 5:00 PM' },
  { id: 3, username: 'alice_w', status: 'Active', log: 'Changed password' },
  { id: 4, username: 'bob_k', status: 'Inactive', log: 'Session timeout' },
  { id: 5, username: 'susan_b', status: 'Active', log: 'New login from mobile' },
  { id: 6, username: 'charlie_c', status: 'Inactive', log: 'Account locked' },
  { id: 7, username: 'dave_l', status: 'Active', log: 'Updated profile picture' },
  { id: 8, username: 'eve_m', status: 'Inactive', log: 'Password reset requested' },
  { id: 9, username: 'frank_o', status: 'Active', log: 'Logged in from new device' },
  { id: 10, username: 'grace_p', status: 'Inactive', log: 'Account deactivated' },
  { id: 11, username: 'hank_q', status: 'Active', log: 'Changed email address' },
  { id: 12, username: 'iris_r', status: 'Inactive', log: 'Two-factor authentication enabled' },
  { id: 13, username: 'jack_s', status: 'Active', log: 'Logged in at 10:00 AM' },
  { id: 14, username: 'karen_t', status: 'Inactive', log: 'Session expired' },
  { id: 15, username: 'leo_u', status: 'Active', log: 'Updated security settings' },
  { id: 16, username: 'mia_v', status: 'Inactive', log: 'Account recovery initiated' },
  { id: 17, username: 'nina_w', status: 'Active', log: 'Logged in from desktop' },
  { id: 18, username: 'oliver_x', status: 'Inactive', log: 'Password changed' },
  { id: 19, username: 'paul_y', status: 'Active', log: 'New device login' },
  { id: 20, username: 'quinn_z', status: 'Inactive', log: 'Account locked due to suspicious activity' },
  { id: 21, username: 'rachel_a', status: 'Active', log: 'Logged in at 11:00 AM' },
  { id: 22, username: 'sam_b', status: 'Inactive', log: 'Password reset successful' },
  { id: 23, username: 'tina_c', status: 'Active', log: 'Updated notification preferences' },
  { id: 24, username: 'uma_d', status: 'Inactive', log: 'Account reactivated' },
  { id: 25, username: 'vicky_e', status: 'Active', log: 'Logged in from tablet' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'username', 'status', 'log'];
  dataSource = new MatTableDataSource<User>(USER_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'user-data.xlsx');
  }
}
