import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const mutation: IResolvers = {
  Mutation: {
    createCourse: ( __: void, { course }):any => {
      const item = { id: String( ++database.courses.length ), ...course, reviews: [] };
      if (database.courses.filter( c => c.title === item.title ).length < 1) {
        database.courses.push( item );
        return item;

      } else {
        return null;
      }
    },
    updateCourse: ( __: void, { course }):any => {
      database.courses = database.courses.map( c => c.id === course ? { ...course, ...c } : c );
      return course;
    },
    deleteCourse: ( __: void, { id }):any => {
      database.courses = database.courses.filter( c => c.id !== id );
      return id;
    }
  }
}

export default mutation;
