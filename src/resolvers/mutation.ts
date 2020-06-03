import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';


const mutation: IResolvers = {
  Mutation: {
    createCourse(__:void, { course }): any {
      const itemCourse = {
        id: String(database.courses.length + 1),
        title: course.title,
        description: course.description,
        clases: course.clases,
        time: course.time,
        level: course.level,
        logo: course.logo,
        path: course.path,
        teacher: course.teacher,
        reviews: []
      }
      if (database.courses.filter(itemCurse => itemCurse.title === itemCourse.title).length === 0) {
        database.courses.push(itemCourse);
        return itemCourse;
      }
      return noCompletado(1);
    },
    updateCourse(__:void, { course }): any {
      const elemeentoExiste = _.findIndex(database.courses, function(o) {
        return o.id === course.id
      });
      if (elemeentoExiste > -1 ) {
        const valoraciones = database.courses[elemeentoExiste].reviews;
        course.reviews = valoraciones;
        database.courses[elemeentoExiste] = course;
        return course;
      }
      return noCompletado(2);
    },
    deleteCourse(__:void, { id }): any {
      const borraCurso = _.remove(database.courses, function(course) {
        return course.id === id;
      });

      if (borraCurso[0] === undefined) {
        return noCompletado(3);
      }
      return borraCurso[0];
    }
    // createCourse: ( __: void, { course }):any => {
    //   const item = { id: String( ++database.courses.length ), ...course, reviews: [] };
    //   if (database.courses.filter( c => c.title === item.title ).length < 1) {
    //     database.courses.push( item );
    //     return item;

    //   } else {
    //     return null;
    //   }
    // },
    // updateCourse: ( __: void, { course }):any => {
    //   database.courses = database.courses.map( c => c.id === course ? { ...course, ...c } : c );
    //   return course;
    // },
    // deleteCourse: ( __: void, { id }):any => {
    //   database.courses = database.courses.filter( c => c.id !== id );
    //   return id;
    // }
  }
}

export default mutation;

function noCompletado(operacion: number) {

  let title = '';
  
  switch(operacion) {
    case 1: { 
      title = 'El curso ya existe con este titulo';
      break; 
      } 
      case 2: { 
      title = 'El curso no existe en la base de datos';
      break; 
      } 
      case 3: { 
      title = 'El curso no se puede borrar porque no se ha encontrado ningún curso con ese ID'; 
      break; 
      } 
      default: { 
      //statements; 
      break; 
      } 
  }
  return {
    id: '-1',
    title,
    description: '',
    clases: -1,
    time: 0.0,
    level: 'TODOS',
    logo: '',
    path: '',
    teacher: '',
    reviews: []
  };
}
