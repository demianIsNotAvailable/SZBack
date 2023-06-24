import {Character} from './model.js';

export const createCharacter = async (data, token) => {
    
    const validatedCharacter = {
        name: data.name,
        description: data.description,
        faction: data.faction,
        player: token.id
    }
    return Character.create(validatedCharacter)
};

export const getMyCharacters = async (token) => {
    return Character.find({ player: token.id, active: true });
};

export const findCharactersByFactionEvent = async (faction="", event="") => {
    const filter = { active: true }
    faction ? filter.faction = faction : null
    event ? filter.event = event : null
    return Character.find(filter).populate("player")
}



export const updateCharacter = async (id, data, token) => {
   if (data.player === token.id) return Character.findByIdAndUpdate(id, data, {new: true})
   throw new Error("UNAUTHORIZED: Not your character.")
};

export const deleteCharacter = async (id, token) => {
    try{
        return Character.findOneAndUpdate({ _id: id, player: token.id }, { active: false }) 
    }
    catch {
        throw new Error ("UNAUTHORIZED: not your character.")
    }
    
}
