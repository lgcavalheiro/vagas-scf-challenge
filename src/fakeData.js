class UsersDB {
  #highestKnownId = 0;
  #data = [
    {
      id: 0,
      name: "João Oliveira",
      job: "Desenvolvedor",
      readCount: 1,
    },
  ];

  // TODO: getAll does not update readCount for each entry to preserve performance
  getAll() {
    return this.#data;
  }

  getByName(name) {
    if (!name || name.trim().length === 0) return;
    const regex = new RegExp(name, "i");

    let result = [];

    for (let entry of this.#data) {
      if (entry.name.match(regex)) {
        entry.readCount++;
        result.push(entry);
      }
    }

    return result;
  }

  getReadCountByName(name) {
    if (!name || name.trim().length === 0) return;

    for (let entry of this.#data) {
      if (entry.name === name) return entry.readCount;
    }
  }

  getById(id) {
    if (!this.#data[id]) return;

    this.#data[id].readCount++;
    return this.#data[id];
  }

  insertEntry(name, job) {
    // TODO: DRY this
    if (!name || !job || name.trim().length === 0 || job.trim().length === 0)
      return;

    const newEntry = {
      id: this.#highestKnownId + 1,
      name,
      job,
      readCount: 0,
    };

    this.#data.push(newEntry);
    this.#highestKnownId = newEntry.id;

    return newEntry;
  }

  updateEntry(id, name, job) {
    // TODO: Update so controller can know validation failed instead of "not found"
    if (!name || !job || name.trim().length === 0 || job.trim().length === 0)
      return;

    let entry = this.getById(id);
    if (!entry) return;

    entry = { ...entry, name, job };
    this.#data[id] = entry;

    return entry;
  }

  deleteByName(name) {
    if (!name || name.trim().length === 0) return;

    for (let entry of this.#data) {
      if (entry.name === name) {
        const deletedEntry = this.#data.splice(this.#data.indexOf(entry), 1);
        return deletedEntry;
      }
    }
  }
}

module.exports = new UsersDB();
