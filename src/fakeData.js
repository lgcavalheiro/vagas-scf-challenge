class UsersDB {
  #highestKnownId = 0;
  #data = [
    {
      id: 0,
      name: "João Oliveira",
      job: "Desenvolvedor",
      readCount: 1,
      isAdmin: true
    },
  ];

  // NOTE: getAll does not update readCount for each entry to preserve performance
  getAll() {
    return this.#data.filter((entry) => entry);
  }

  getByName(name) {
    const regex = new RegExp(name, "i");

    let result = [];

    for (let entry of this.#data) {
      if (entry && entry.name.match(regex)) {
        entry.readCount++;
        result.push(entry);
      }
    }

    return result;
  }

  getReadCountByName(name) {
    for (let entry of this.#data) {
      if (entry && entry.name === name) return entry.readCount;
    }
  }

  getById(id) {
    if (!this.#data[id]) return;

    this.#data[id].readCount++;
    return this.#data[id];
  }

  insertEntry(name, job) {
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
    let entry = this.getById(id);
    if (!entry) return;

    entry = { ...entry, name, job };
    this.#data[id] = entry;

    return entry;
  }

  deleteByName(name) {
    for (let entry of this.#data) {
      if (entry && entry.name === name) {
        this.#data[this.#data.indexOf(entry)] = null;
        return entry;
      }
    }
  }
}

module.exports = new UsersDB();
