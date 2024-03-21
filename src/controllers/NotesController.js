const knex = require("../database/knex");

class NotesController {
  async create(request, response){
    const { title, description, tags, rating } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
      rating
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const note = await knex("notes").where({ id }).first();

      if (!note) {
        return response.status(404).json({ error: 'Note not found' });
      }

      return response.json(note);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await knex("notes").where({ id }).delete();

      response.json({ message: 'Note deleted successfully' });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag);

      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title")

    } else {
      notes = await knex("notes")
        .where({ user_id })
        .where("title", "like", `%${title}%`)
        .orderBy("title");
    }
    
    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });
      
    return response.json(notesWithTags);
  }
}

module.exports = NotesController;