import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';

const type: IResolvers = {
  Student: {
    courses: parent => {
      const cursosLista : Array<any> = [];
      parent.courses.map((course: string) => {
          cursosLista.push(_.filter(database.courses, ['id', course])[0]);
      });
      return cursosLista;
  }
    // courses: parent =>  parent.courses.map( (id: string) => database.courses.filter( course => course.id === id )[0] )
  },
  Course: {
    path: parent => `http://www.udemy.com${ parent.path }`,
    students: parent => {
      const listaEstudiantes: Array<any> = [];
      const idCurso = parent.id;
      database.students.map((student: any) => {
          if (student.courses.filter ( (id: any ) => id === idCurso)> 0) {
              listaEstudiantes.push(student);
          }
      });
      return listaEstudiantes;
    }
    // students: parent => database.students.filter( student => student.courses.filter( id => id === parent.id ))
    // reviews: parent =>  parent.courses.map( (id: string) => database.courses.filter( course => course.id === id )[0] )
  }
}

export default type;
