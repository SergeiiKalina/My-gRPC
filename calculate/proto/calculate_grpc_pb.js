// GENERATED CODE -- DO NOT EDIT!

"use strict"
var grpc = require("@grpc/grpc-js")
var calculate_proto_calculate_pb = require("../../calculate/proto/calculate_pb.js")

function serialize_calculate_AverageRequest(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.AverageRequest)) {
        throw new Error("Expected argument of type calculate.AverageRequest")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_AverageRequest(buffer_arg) {
    return calculate_proto_calculate_pb.AverageRequest.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

function serialize_calculate_AverageResponse(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.AverageResponse)) {
        throw new Error("Expected argument of type calculate.AverageResponse")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_AverageResponse(buffer_arg) {
    return calculate_proto_calculate_pb.AverageResponse.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

function serialize_calculate_CalculateRequest(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.CalculateRequest)) {
        throw new Error("Expected argument of type calculate.CalculateRequest")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_CalculateRequest(buffer_arg) {
    return calculate_proto_calculate_pb.CalculateRequest.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

function serialize_calculate_CalculateResponse(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.CalculateResponse)) {
        throw new Error("Expected argument of type calculate.CalculateResponse")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_CalculateResponse(buffer_arg) {
    return calculate_proto_calculate_pb.CalculateResponse.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

function serialize_calculate_MaxNumberRequest(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.MaxNumberRequest)) {
        throw new Error("Expected argument of type calculate.MaxNumberRequest")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_MaxNumberRequest(buffer_arg) {
    return calculate_proto_calculate_pb.MaxNumberRequest.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

function serialize_calculate_MaxNumberResponse(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.MaxNumberResponse)) {
        throw new Error("Expected argument of type calculate.MaxNumberResponse")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_MaxNumberResponse(buffer_arg) {
    return calculate_proto_calculate_pb.MaxNumberResponse.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

function serialize_calculate_SqrtRequest(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.SqrtRequest)) {
        throw new Error("Expected argument of type calculate.SqrtRequest")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_SqrtRequest(buffer_arg) {
    return calculate_proto_calculate_pb.SqrtRequest.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

function serialize_calculate_SqrtResponse(arg) {
    if (!(arg instanceof calculate_proto_calculate_pb.SqrtResponse)) {
        throw new Error("Expected argument of type calculate.SqrtResponse")
    }
    return Buffer.from(arg.serializeBinary())
}

function deserialize_calculate_SqrtResponse(buffer_arg) {
    return calculate_proto_calculate_pb.SqrtResponse.deserializeBinary(
        new Uint8Array(buffer_arg)
    )
}

var CalculateServiceService = (exports.CalculateServiceService = {
    calculate: {
        path: "/calculate.CalculateService/Calculate",
        requestStream: false,
        responseStream: false,
        requestType: calculate_proto_calculate_pb.CalculateRequest,
        responseType: calculate_proto_calculate_pb.CalculateResponse,
        requestSerialize: serialize_calculate_CalculateRequest,
        requestDeserialize: deserialize_calculate_CalculateRequest,
        responseSerialize: serialize_calculate_CalculateResponse,
        responseDeserialize: deserialize_calculate_CalculateResponse,
    },
    algorithm: {
        path: "/calculate.CalculateService/Algorithm",
        requestStream: false,
        responseStream: true,
        requestType: calculate_proto_calculate_pb.CalculateRequest,
        responseType: calculate_proto_calculate_pb.CalculateResponse,
        requestSerialize: serialize_calculate_CalculateRequest,
        requestDeserialize: deserialize_calculate_CalculateRequest,
        responseSerialize: serialize_calculate_CalculateResponse,
        responseDeserialize: deserialize_calculate_CalculateResponse,
    },
    average: {
        path: "/calculate.CalculateService/Average",
        requestStream: true,
        responseStream: false,
        requestType: calculate_proto_calculate_pb.AverageRequest,
        responseType: calculate_proto_calculate_pb.AverageResponse,
        requestSerialize: serialize_calculate_AverageRequest,
        requestDeserialize: deserialize_calculate_AverageRequest,
        responseSerialize: serialize_calculate_AverageResponse,
        responseDeserialize: deserialize_calculate_AverageResponse,
    },
    maxNumber: {
        path: "/calculate.CalculateService/MaxNumber",
        requestStream: true,
        responseStream: true,
        requestType: calculate_proto_calculate_pb.MaxNumberRequest,
        responseType: calculate_proto_calculate_pb.MaxNumberResponse,
        requestSerialize: serialize_calculate_MaxNumberRequest,
        requestDeserialize: deserialize_calculate_MaxNumberRequest,
        responseSerialize: serialize_calculate_MaxNumberResponse,
        responseDeserialize: deserialize_calculate_MaxNumberResponse,
    },
    sqrt: {
        path: "/calculate.CalculateService/Sqrt",
        requestStream: false,
        responseStream: false,
        requestType: calculate_proto_calculate_pb.SqrtRequest,
        responseType: calculate_proto_calculate_pb.SqrtResponse,
        requestSerialize: serialize_calculate_SqrtRequest,
        requestDeserialize: deserialize_calculate_SqrtRequest,
        responseSerialize: serialize_calculate_SqrtResponse,
        responseDeserialize: deserialize_calculate_SqrtResponse,
    },
})

exports.CalculateServiceClient = grpc.makeGenericClientConstructor(
    CalculateServiceService
)
