import { getSubscription } from './index'
console.log('example')
getSubscription({
  url: 'http://192.168.100.199:8088/v1/graphql',
  query: `subscription ContractMappings {
    mappings {
      api_user_id
      contract_name
      mapping
    }
  }`,
  connectionParams: {
    headers: {
      'x-hasura-admin-secret':  'XXX'
    }
  },
  onData: (data)=> {
    console.log("Received event: ");
    console.log(JSON.stringify(data, null, 2));
  },
  onError: (error)=> {
    console.log('Err');
    console.log(error);
  }
});
