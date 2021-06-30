"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.getSubscription({
    url: 'http://192.168.0.101:8088/v1/graphql',
    query: `subscription ContractMappings {
    mappings {
      api_user_id
      contract_name
      mapping
    }
  }`,
    connectionParams: {
        headers: {
            'x-hasura-admin-secret': '=NBc;?2eduh)?mxq'
        }
    },
    onData: (data) => {
        console.log("Received event: ");
        console.log(JSON.stringify(data, null, 2));
    },
    onError: (error) => {
        console.log('Err');
        console.log(error);
    }
});
//# sourceMappingURL=example.js.map