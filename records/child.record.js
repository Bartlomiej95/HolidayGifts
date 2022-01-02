class ChildRecord {
    static listAll() {
        return [
            {
                id: 'abc1',
                name: 'Ania',
                gift: 'Domek dla lalek'
            },
            {
                id: 'efg2',
                name: 'Piotrek',
                gift: 'Samochodzik brum brum'
            }
        ]
    }
}

module.exports = {
    ChildRecord,
}