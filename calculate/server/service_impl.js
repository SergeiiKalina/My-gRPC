const pb = require("../proto/calculate_pb")
const { AverageResponse, SqrtResponse } = require("../proto/calculate_pb")
const grpc = require("@grpc/grpc-js")

exports.calculate = (call, callback) => {
    const numberOne = call.request.getNumberone()
    const numberTwo = call.request.getNumbertwo()
    const sum = numberOne + numberTwo

    const res = new pb.CalculateResponse()
    res.setSum(sum)
    callback(null, res)
}

exports.algorithm = (call, _) => {
    let number = call.request.getNumberone()
    let divideNumber = 2
    while (number > 1) {
        if (number % divideNumber === 0) {
            const res = new pb.CalculateResponse()
            res.setSum(divideNumber)

            call.write(res)
            number = number / divideNumber
        } else {
            divideNumber = divideNumber + 1
        }
    }
}

exports.average = (call, callback) => {
    console.log("average was invoked")
    let sum = 0
    let countNumber = 0
    call.on("data", (req) => {
        sum += req.getNumber()

        ++countNumber
    })
    call.on("end", () => {
        const response = new AverageResponse()
        response.setResult(sum / countNumber)
        callback(null, response)
    })
}

exports.maxNumber = (call) => {
    console.log("maxNumber was invoked")
    let currentBiggestNumber = 0
    call.on("data", (req) => {
        if (currentBiggestNumber > req.getNumber()) {
            console.log(`little number ${req.getNumber()}`)
            return
        } else {
            console.log(`biggest number ${req.getNumber()}`)
            const res = new pb.MaxNumberResponse()
            currentBiggestNumber = req.getNumber()
            res.setResult(currentBiggestNumber)
            call.write(res)
            console.log(`Sending response ${res}`)
        }
    })
    call.on("end", () => {
        call.end()
    })
}

exports.sqrt = (call, callback) => {
    console.log("sqrt was invoked")

    const number = call.request.getNumber()

    if (number < 0) {
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: `Number can not negative, received ${number}`,
        })
    }
    const response = new SqrtResponse().setResult(Math.sqrt(number))
    callback(null, response)
}
