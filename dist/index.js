"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscription = void 0;
const apollo_link_1 = require("apollo-link");
const apollo_link_ws_1 = require("apollo-link-ws");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const ws = require("ws");
const graphql_tag_1 = require("graphql-tag");
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