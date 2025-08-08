type AddOrSubtractDaysFromDate = (
    days: number,
    add?: boolean,
    startingDate?: Date
) => Date

type AddOrSubtractMinutesFromDate = (
    minutes: number,
    add?: boolean,
    startingDate?: Date
) => Date

export const addOrSubtractDaysFromDate: AddOrSubtractDaysFromDate = (
    days,
    add,
    startingDate = new Date()
) => {
    if (add) return new Date(new Date().setDate(startingDate.getDate() + days))
    else return new Date(new Date().setDate(startingDate.getDate() - days))
}

export const addOrSubtractMinutesFromDate: AddOrSubtractMinutesFromDate = (
    minutes,
    add,
    startingDate = new Date()
) => {
    if (add)
        return new Date(new Date().setMinutes(startingDate.getMinutes() + minutes))
    else
        return new Date(new Date().setMinutes(startingDate.getMinutes() - minutes))
}