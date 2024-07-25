const style1 = require('./styles/style1')
const style2 = require('./styles/style2')

const portfolio = (tem, data) => {


    if (tem == 'portfolio1') {

        let str = style1(data)
        return str
    }
    else if(tem == 'portfolio2'){
        let str = style2(data)
        return str
    }
    else{

        return null
    }
}

module.exports = portfolio;