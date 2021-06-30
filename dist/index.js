"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscription = void 0;
const apollo_link_1 = require("apollo-link");
const apollo_link_ws_1 = require("apollo-link-ws");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const ws = __importStar(require("ws"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const getWsClient = function (wsurl, connectionParams) {
    const client = new subscriptions_transport_ws_1.SubscriptionClient(wsurl, { reconnect: true, connectionParams }, ws);
    return client;
};
const createSubscriptionObservable = (wsurl, query, variables, connectionParams) => {
    const link = new apollo_link_ws_1.WebSocketLink(getWsClient(wsurl, connectionParams));
    return apollo_link_1.execute(link, {
        query: graphql_tag_1.default `
      ${query}
    `,
        variables: variables,
    });
};
const getSubscription = ({ url, query, variables, onData, onError, connectionParams }) => {
    const subscriptionClient = createSubscriptionObservable(url, query, variables, connectionParams);
    return subscriptionClient.subscribe(onData, onError);
};
exports.getSubscription = getSubscription;
//# sourceMappingURL=index.js.map