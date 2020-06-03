import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';

const query: IResolvers = {
  Query: {
    students(): any {
      return database.students;
    },
    student(__: void, { id }): any {
      const resultado = database.students.filter(student => student.id === id)[0];
      if (resultado === undefined) {
        return {
          id: '-1',
          name: `No se ha encontrado el estudiante con el ID ${id}`,
          email: '',
          courses: []
        }
      }
      return resultado;
    },
    courses(): any {
      return database.courses;
    },
    course(__: void, { id }): any {
      const resultado = database.courses.filter(course_ => course_.id === id)[0];
      if (resultado === undefined) {
        return {
          id: '-1',
          title: `No se ha encontrado el curso con el ID ${id}`,
          description: '',
          clases: -1,
          time: 0.0,
          logo: '',
          level: 'TODOS',
          path: '',
          teacher: '',
          reviews: []
        }
      }
      return resultado;
    }
    // students: (): any => database.students,
    // student: ( ___: void, { id }): any => database.students.filter( student => student.id === id )[0],
    // courses: (): any => database.courses,
    // course: ( ___: void, { id }): any => database.courses.filter( course => course.id === id )[0],
  }
}

export default query;
