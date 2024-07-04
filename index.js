#!/usr/bin/env node
import inquirer from "inquirer";
class Student {
    name;
    age;
    grade;
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
}
const students = [];
const addStudent = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter student age:'
        },
        {
            type: 'number',
            name: 'grade',
            message: 'Enter student grade:'
        }
    ]);
    const student = new Student(answers.name, answers.age, answers.grade);
    students.push(student);
    console.log('Student added successfully!');
};
const viewStudents = () => {
    if (students.length === 0) {
        console.log('No students found.');
        return;
    }
    console.log('List of students:');
    students.forEach((student, index) => {
        console.log(`${index + 1}. Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
    });
};
const updateStudent = async () => {
    if (students.length === 0) {
        console.log('No students found.');
        return;
    }
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'index',
            message: 'Enter the index of the student to update:'
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter new student name:'
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter new student age:'
        },
        {
            type: 'number',
            name: 'grade',
            message: 'Enter new student grade:'
        }
    ]);
    const index = answers.index - 1;
    if (index < 0 || index >= students.length) {
        console.log('Invalid index.');
        return;
    }
    const student = students[index];
    student.name = answers.name;
    student.age = answers.age;
    student.grade = answers.grade;
    console.log('Student updated successfully!');
};
const deleteStudent = async () => {
    if (students.length === 0) {
        console.log('No students found.');
        return;
    }
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'index',
            message: 'Enter the index of the student to delete:'
        }
    ]);
    const index = answers.index - 1;
    if (index < 0 || index >= students.length) {
        console.log('Invalid index.');
        return;
    }
    students.splice(index, 1);
    console.log('Student deleted successfully!');
};
const main = async () => {
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Add Student', 'View Students', 'Update Student', 'Delete Student', 'Exit']
            }
        ]);
        switch (answers.action) {
            case 'Add Student':
                await addStudent();
                break;
            case 'View Students':
                viewStudents();
                break;
            case 'Update Student':
                await updateStudent();
                break;
            case 'Delete Student':
                await deleteStudent();
                break;
            case 'Exit':
                console.log('Exiting the application...');
                return;
        }
    }
};
main();
