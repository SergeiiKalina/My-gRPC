const grpc = require("@grpc/grpc-js")
const { CalculateServiceClient } = require("../proto/calculate_grpc_pb")
const {
    CalculateRequest,
    AverageRequest,
    MaxNumberRequest,
    SqrtRequest,
} = require("../proto/calculate_pb")

function calculate(client) {
    console.log("calculate was invoked")
    const req = new CalculateRequest()
    req.setNumberone(3)
    req.setNumbertwo(3)

    client.calculate(req, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log(res.getSum())
    })
}

function doAlgorithm(client) {
    console.log("doAlgorithm was invoked")
    const req = new CalculateRequest()
    req.setNumberone(1555666222)
    const call = client.algorithm(req)
    call.on("data", (res) => {
        console.log(`doAlgorithm result ${res.getSum()}`)
    })
}

function getAverageNumber(client) {
    console.log("Do getAverageNumber")

    const numbers = [1, 2, 3, 4, 5, 5, 5, 7, 9]
    const call = client.average((err, res) => {
        if (err) {
            return console.log(err)
        }

        console.log(res.getResult())
    })

    numbers
        .map((number) => {
            return new AverageRequest().setNumber(number)
        })
        .forEach((req) => {
            call.write(req)
        })
    call.end()
}

function getCurrentBiggestNumber(client) {
    console.log("getCurrentBiggestNumber was invoked")
    const numbers = [1, 5, 3, 6, 2, 20]

    const call = client.maxNumber()

    call.on("data", (res) => {
        console.log(`This number now Biggest: ${res.getResult()}`)
    })
    numbers.forEach((number) => {
        const req = new MaxNumberRequest()
        req.setNumber(number)
        call.write(req)
    })

    call.end()
}

function doSqrt(client, n) {
    console.log("doSqrt was invoked")
    const req = new SqrtRequest().setNumber(n)
    client.sqrt(req, (err, res) => {
        if (err) {
            return console.log(err)
        }

        console.log(`Sqrt: ${res.getResult()}`)
    })
}

function main() {
    const credential = grpc.ChannelCredentials.createInsecure()
    const client = new CalculateServiceClient("localhost:50051", credential)
    // doAlgorithm(client)
    // calculate(client)
    // getAverageNumber(client)
    // getCurrentBiggestNumber(client)
    // doSqrt(client, 25)
    doSqrt(client, -1)
}
main()
