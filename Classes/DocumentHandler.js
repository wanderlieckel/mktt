import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class DocumentHandler {
  constructor(basePath = __dirname) {
    this.paths = {
      agents: path.join(basePath, 'agents'),
      orders: path.join(basePath, 'orders')
    };

    // Cache em memória
    this.data = {
      agents: {},
      orders: {}
    };
  }

  /* ===============================
     Inicialização
  =============================== */
  async init() {
    await this.#loadFolder('agents');
    await this.#loadFolder('orders');
  }

  async #loadFolder(type) {
    const files = await this.listFiles(type);

    for (const file of files) {
      const filePath = path.join(this.paths[type], file);
      const content = await fs.readFile(filePath, 'utf-8');
      this.data[type][file] = JSON.parse(content);
    }
  }

  /* ===============================
     Leitura
  =============================== */
  get(type, filename) {
    return this.data[type]?.[filename] ?? null;
  }

  getAll(type) {
    return this.data[type];
  }

  /* ===============================
     Escrita / Atualização
  =============================== */
  async save(type, filename, object) {
    const filePath = path.join(this.paths[type], filename);

    await fs.writeFile(
      filePath,
      JSON.stringify(object, null, 2),
      'utf-8'
    );

    // Atualiza cache
    this.data[type][filename] = object;
  }

  async update(type, filename, newData) {
    if (!this.data[type][filename]) {
      throw new Error(`Arquivo ${filename} não existe em ${type}`);
    }

    const updated = {
      ...this.data[type][filename],
      ...newData
    };

    await this.save(type, filename, updated);
  }

  /* ===============================
     Listagem de arquivos
  =============================== */
  async listFiles(type) {
    const items = await fs.readdir(this.paths[type], { withFileTypes: true });

    return items
      .filter(item => item.isFile() && item.name.endsWith('.json'))
      .map(item => item.name);
  }
}