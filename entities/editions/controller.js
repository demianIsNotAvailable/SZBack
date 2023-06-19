import { User } from "../users/model.js";
import  Jwt  from "jsonwebtoken";
import { Edition } from "./model.js";
import config from "../../core/config.js";



export const createEdition = async (data) => {
    if (!data.location || !data.date || !data.time || !data.description || !data.type) {
        throw new Error("MISSNIG_DATA")
    }
    return Edition.create(data)
}



// por defecto devuelve todos los eventos, pero puedes filtrar dinámicamente por fechas, localizaciones y si como usuario estás apuntado.
export const listEditions = async (start = "", end = "", location = "", headers) => {
    const filter = { active: true }

    if(headers.authorization) {
        const token = headers.authorization.split(' ')[1];
        try {
            headers.token = Jwt.verify(token, config.SECRET)
            filter._id = { $in: headers.token.editions }
        } catch(e){        
            throw new Error(e);
        }
    }    
    if (start && !end) filter.date = { $gte: start }
    if (end && !start) filter.date = { $lte: end }
    if (start && end) filter.date = { $gte: start, $lte: end }
    if (location) filter.location = location;

    return Edition.find(filter)
}


export const findEdition = async (id) => {
    return Edition.findOne({ _id: id, active : true })
}


export const updateEdition = async (id, data) => {
    return Edition.findOneAndUpdate(id, data)
}

// ternaria que te apunta al evento si no estás apuntado, y te borra si ya lo estás.
export const joinEdition = async (editionId, userId) => {

        const user = await User.findById(userId).select('events')
        const edition = await Edition.findById(editionId).select('users')

        user.events.includes(editionId) || edition.users.includes(userId)
        ? (edition.users.splice(edition.users.indexOf(userId, 1)), user.events.splice(user.events.indexOf(editionId, 1)))        
        : (user.events.push(edition._id), edition.users.push(user._id))        

        return Promise.all([user.save(), edition.save()])
}