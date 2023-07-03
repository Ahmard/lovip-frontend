import BaseModel from "~/models/base.model";

export class Folder extends BaseModel {
  id: string
  name: string


  static make_folder_model(name: string) {
    const folder = new Folder;
    folder.id = btoa(name)
    folder.name = name
    folder.created_at = new Date().toLocaleString()
    folder.updated_at = new Date().toLocaleString()
    return folder
  }

  static get_folders(): Folder[] {
    return JSON.parse(localStorage.getItem('folders') ?? '[]')
  }

  static save_folders(folders: Folder[]) {
    localStorage.setItem('folders', JSON.stringify(folders))
  }

  static add_folder(folder: string) {
    const folders = Folder.get_folders()
    folders.push(Folder.make_folder_model(folder))
    Folder.save_folders(folders)
  }

  static remove_folder(folder: string) {
    let folders = Folder.get_folders();

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].name == folder) {
        folders.splice(i, 1)
        break;
      }
    }

    console.log(folders)
    Folder.save_folders(folders)
  }
}
