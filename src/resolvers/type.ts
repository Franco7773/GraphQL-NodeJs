import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const type: IResolvers = {
  Student: {
    courses: parent =>  parent.courses.map( (id: string) => database.courses.filter( course => course.id === id )[0] )
  },
  Course: {
    path: parent => `http://www.udemy.com${ parent.path }`,
    students: parent => database.students.filter( student => student.courses.filter( id => id === parent.id ))
    // reviews: parent =>  parent.courses.map( (id: string) => database.courses.filter( course => course.id === id )[0] )
  }
}

export default type;
