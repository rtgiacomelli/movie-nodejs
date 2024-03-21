// const knex = require("../database/knex");

// class TagsController {
//   async index(request, response) {
//     const { user_id } = request.params;

//     const tags = await knex("tags")
//       .where({ user_id })

//     return response.json(tags);
//   }

//   async create(request, response){
//     try {
//       const { name } = request.body;
//       const { note_id } = request.params;
//       const { user_id } = request.params;
      
//       const [tag_id] = await knex("tags").insert({
//         note_id,
//         user_id,
//         name
//       });
      
//       response.status(201).json({ tag_id });
//     } catch (error) {
//       response.status(500).json({ error: error.message });
//     }
//   }

//   async show(request, response) {
//     try {
//       const { id } = request.params;

//       const tag = await knex("tags").where({ id }).first();

//       if (!tag) {
//         return response.status(404).json({ error: 'Tag not found' });
//       }

//       return response.json(tag);
//     } catch (error) {
//       response.status(500).json({ error: error.message });
//     }
//   }

//   async delete(request, response) {
//     try {
//       const { id } = request.params;

//       await knex("tags").where({ id }).delete();

//       response.json({ message: 'Tag deleted successfully' });
//     } catch (error) {
//       response.status(500).json({ error: error.message });
//     }
//   }

//   }


// module.exports = TagsController;

const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("tags")
      .where({ user_id })

    return response.json(tags);
  }

}

module.exports = TagsController;