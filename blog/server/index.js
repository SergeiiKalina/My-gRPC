const fs = require("fs")
const grpc = require("@grpc/grpc-js")
const serviceImpl = require("./service_impl")
const { BlogServiceService } = require("../proto/blog_grpc_pb")
const { MongoClient } = require("mongodb")

const addr = "localhost:50051"
const uri = "mongodb://root:root@localhost:27017/"
const mongoClient = new MongoClient(uri)

global.collection = undefined

async function cleanup(server) {
    console.log("cleanup")

    if (server) {
        await mongoClient.close()
        server.forceShutdown()
    }
}

async function main() {
    const server = new grpc.Server()
    const tls = true
    let creds

    if (tls) {
        const rootCert = fs.readFileSync("./ssl/ca.crt")
        const certChain = fs.readFileSync("./ssl/server.crt")
        const privateKey = fs.readFileSync("./ssl/server.pem")

        creds = grpc.ServerCredentials.createSsl(rootCert, [
            { cert_chain: certChain, private_key: privateKey },
        ])
    } else {
        creds = grpc.ServerCredentials.createInsecure()
    }

    process.on("SIGINT", () => {
        console.log("caught interrupt signal")
        cleanup(server)
    })

    await mongoClient.connect()

    const database = mongoClient.db("blogdb")
    collection = database.collection("blog")

    server.addService(BlogServiceService, serviceImpl)
    server.bindAsync(addr, creds, (err, _) => {
        if (err) {
            return cleanup(server)
        }
    })
    console.log(`listening on ${addr}`)
}

main().catch(cleanup)
