import { Edition } from "./model.js";



export const createEdition = async (data) => {
    if (!data.location || !data.date || !data.time || !data.description || !data.eventType) {
        throw new Error("MISSNIG_DATA")
    }
    return await Edition.create(data)
}


export const listEditions = async (start, end, location) => {
    const filter = { $and: [{ active: true }] };
 
    if ( start && !end ) filter.$and.push({ end: { $gte: start } });
    if ( end && !start ) filter.$and.push({ start: [{ $lte: end }] });
    if ( start && end ) filter.$and.push({ end: { $gte: start } }, { start: { $lte: end } });
    if (location) filter.$and.push({location: location})

    return await Event.find(filter)
}


export const findEdition = async (id) => {
    return await Edition.findOne({ _id: id, active : true })
}


export const updateEdition = async (id, data) => {
    return await Edition.findOneAndUpdate(id, data)
}