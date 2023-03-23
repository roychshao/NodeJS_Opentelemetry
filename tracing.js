const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { Resource } = require('@opentelemetry/resources');
const api = require('@opentelemetry/api');
const { AsyncHooksContextManager } = require('@opentelemetry/context-async-hooks');



// OpenTelemetry tracerProvider
const tracerProvider = new NodeTracerProvider();

// Jaeger exporter
const jaegerExporter = new JaegerExporter({
    serviceName: "node-otel",
    //  Jaeger agent host and port
    agentHost: "localhost",
    agentPort: 6832,
});

// add jaegerExporter into spanProcessor of tracerProvider
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));

// register tracerProvider
tracerProvider.register();

// instantiate a tracer
const tracer = tracerProvider.getTracer("node-otel");

// OpenTelemetry contextManager
const contextManager = new AsyncHooksContextManager();
contextManager.enable();
api.context.setGlobalContextManager(contextManager);

module.exports = {
    tracer,
    api,
}
