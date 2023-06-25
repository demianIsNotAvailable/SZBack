import { getCharacterById } from "../characters/controller";
import { Participation } from "./model";

export const createParticipation = async (data, token) => {
    
    if (data.player !== token.id ) throw new Error("UNAUTHORIZED: not your character.") 
    return Participation.create(data)
}


export const getParticipationList = async (id, token) => {
    const character = await getCharacterById(id, token)
    if (character.player !== token.id) throw new Error ("UNAUTHORIZED: not your character.")
    return Participation.find({ character: id })
   
}


export const updateParticipation = async (id, data, token) => {
    if (data.player !== token.id) throw new Error("UNAUTHORIZED: Not your character.")    
    return Participation.findByIdAndUpdate(id, data, {new: true})
 };


export const deleteParticipation = async (id, charId, token) => {
    const character = await getCharacterById(charId, token)
    if (character.player !== token.id) throw new Error ("UNAUTHORIZED: not your character.")
    return Participation.updateOne({ _id: id }, { active: false })
}