'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm dữ liệu cho bảng 'departments'
    await queryInterface.bulkInsert('departments', [
      { department_name: 'HR', createdAt: new Date(), updatedAt: new Date() },
      { department_name: 'Engineering', createdAt: new Date(), updatedAt: new Date() },
      { department_name: 'Sales', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Thêm dữ liệu cho bảng 'employees'
    await queryInterface.bulkInsert('employees', [
      {
        full_name: 'Đinh Bá Việt Anh',
        dob: '1985-01-15',
        gender: 1,
        phone_number: '123456789',
        address: '123 Main St',
        department_id: '1026645779692355585',  // Đã gán vào 'HR'
        dependent_number: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        full_name: 'Tester01',
        dob: '1990-06-20',
        gender: 2,
        phone_number: '987654321',
        address: '456 Elm St',
        department_id: '1026645779692355585',  // Đã gán vào 'Engineering'
        dependent_number: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Thêm dữ liệu cho bảng 'accounts'
    await queryInterface.bulkInsert('accounts', [
      {
        email: 'a@gmail.com',
        pass_word: '    ',
        employee_id: '1026645891850207233',
        type: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'b@gmail.com',
        pass_word: 'password456',
        employee_id: '1026645891850338305',
        type: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Thêm dữ liệu cho bảng 'salaries'
    await queryInterface.bulkInsert('salaries', [
      {
        employee_id: 1,
        base_salary: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 2,
        base_salary: 7000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Thêm dữ liệu cho bảng 'month_salaries'
    await queryInterface.bulkInsert('month_salaries', [
      {
        employee_id: 1,
        salary_id: 1,
        month: new Date('2024-10-01'),
        year: new Date('2024-10-01'),
        deductions: 200,
        total_salary: 4800,
        tax: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_id: 2,
        salary_id: 2,
        month: new Date('2024-10-01'),
        year: new Date('2024-10-01'),
        deductions: 300,
        total_salary: 6700,
        tax: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa dữ liệu cho bảng 'month_salaries'
    await queryInterface.bulkDelete('month_salaries', null, {});

    // Xóa dữ liệu cho bảng 'salaries'
    await queryInterface.bulkDelete('salaries', null, {});

    // Xóa dữ liệu cho bảng 'accounts'
    await queryInterface.bulkDelete('accounts', null, {});

    // Xóa dữ liệu cho bảng 'employees'
    await queryInterface.bulkDelete('employees', null, {});

    // Xóa dữ liệu cho bảng 'departments'
    await queryInterface.bulkDelete('departments', null, {});
  }
};
