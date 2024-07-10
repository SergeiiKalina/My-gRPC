const grpc = require("@grpc/grpc-js")
const fs = require("fs")
const { BlogServiceClient } = require("../proto/blog_grpc_pb")
const { createBlog } = require(".")

async function main() {
    const tls = true
    let creds

    if (tls) {
        const rootCert = fs.readFileSync("./ssl/ca.crt")

        creds = grpc.ChannelCredentials.createSsl(rootCert)
    } else {
        creds = grpc.ChannelCredentials.createInsecure()
    }
    const client = new BlogServiceClient("localhost:50051", creds)

    const id = await createBlog(client)
    // await readBlog(client, id)
}
exports.main = main
