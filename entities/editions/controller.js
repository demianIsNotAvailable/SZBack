import mongoose from "mongoose";
import { User } from "../users/model.js";
import { Edition } from "./model.js";



export const createEdition = async (data) => {
    if (!data.location || !data.date || !data.time || !data.description || !data.eventType) {
        throw new Error("MISSNIG_DATA")
    }
    return await Edition.create(data)
}


export const listEditions = async (start, end, location) => {
    const filter = { active: true }
 
    if (start && !end) filter.date = { $gte: start }
    if (end && !start) filter.date = { $lte: end }
    if (start && end) filter.date = { $gte: start, $lte: end }
    if (location) filter.location = location;

    return await Edition.find(filter)
}


export const findEdition = async (id) => {
    return await Edition.findOne({ _id: id, active : true })
}


export const updateEdition = async (id, data) => {
    return await Edition.findOneAndUpdate(id, data)
}


export const joinEdition = async (editionId, userId) => {

        const user = await User.findById(userId).select('events')
        const edition = await Edition.findById(editionId).select('users')

        if (user.events.includes(edition._id) || edition.users.includes(user._id)) throw new Error ("DUPLICATED_DATA")

        user.events.push(edition._id)
        edition.users.push(user._id)

        return await Promise.all([user.save(), edition.save()])
        

}