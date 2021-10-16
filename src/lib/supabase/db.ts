import db from "./config";
import { v4 } from "uuid";

const name = "name";
const level  = 1; 
const id = v4();

function Character(id) {
  this.id = id;
  this.level; 
  this.userId; 
  this.class;

  this.set = async function() {
    const { data, error } = await db.from('Characters')
      .select('*')
      .filter('id', 'is', id);
    
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    } 
  }

  this.persist = async function() {
    const { name, level, id, userId } = this;
    const character = { name, level, id, userId, class: this.class };
    const { data, error } = await db.from('Characters').insert([character]);
    if (error) {
      console.log(error);
    }
    return data;  
  }

  // stores for dice rolls
  // loads of data - positively mounds 
  // inventory 
  // equipment 
  // spells
  // abilities
  // health, stamina, points, etc.
}

export default Character;
