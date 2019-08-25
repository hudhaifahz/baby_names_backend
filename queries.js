const Pool = require('pg').Pool

const uuidv1 = require("uuid/v1");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

const getNames = (request, response) => {

  const listid = request.params.id

  const getNames = {
    name: 'get-names',
    text: `SELECT babyname FROM public.names WHERE listid = $1`,
    values: [listid],
  }

  pool.query(getNames, (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}

// const postList = (request, response) => {

//   const { uuid } = request.body

//   console.log('uuid', request.body)

//   const postList = {
//     name: 'post-list',
//     text: `INSERT INTO public.lists ( "id" ) VALUES ( $1 )`,
//     values: [uuid],
//   }

//   pool.query(postList, (error, results) => {
//       if (error) {
//           throw error
//       }
//       response.status(200).json(results.rows)
//       })
// }

const postName = (request, response) => {

  const { uuid, name } = request.body
  var nameuuid = uuidv1()

  console.log('uuid', request.body)

  const postName = {
    name: 'post-name',
    text: `INSERT INTO public.names ( "id", "babyname", "listid" ) VALUES ( $1, $2, $3 )`,
    values: [nameuuid, name, uuid],
  }

  pool.query(postName, (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
      })
}

module.exports = {
  getNames,
  // postList,
  postName,
}