import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
  Query: {
    students: (): any => database.students,
    student: ( ___: void, { id }): any => database.students.filter( student => student.id === id )[0],
    courses: (): any => database.courses,
    course: ( ___: void, { id }): any => database.courses.filter( course => course.id === id )[0],
  }
}

export default query;
