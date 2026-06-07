import fs from 'fs/promises';
import path from 'path';

export class JsonRepository {
  constructor(fileName) {
    this.filePath = path.join(process.cwd(), 'src', 'data', fileName);
  }

  async getAll() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  }

  async getById(id) {
    const items = await this.getAll();
    return items.find(item => item.id === id);
  }

  async create(newItem) {
    const items = await this.getAll();
    items.push(newItem);
    await this.save(items);
    return newItem;
  }

  async update(id, updatedItem) {
    let items = await this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...updatedItem, id }; // Ensure ID doesn't change
    await this.save(items);
    return items[index];
  }

  async delete(id) {
    let items = await this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    if (items.length === filteredItems.length) return false;
    
    await this.save(filteredItems);
    return true;
  }

  async save(items) {
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
  }
}
