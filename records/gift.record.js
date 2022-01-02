class GiftRecord {
    static listAll() {
        return [
            {
                id: 'ab12',
                name: 'Domek dla lalek',
                count: 3,
            },
            {
                id: 'gr43',
                name: 'Samochodzik brum brum',
                count: 4
            }
        ]
    }
}

module.exports = {
    GiftRecord,
}