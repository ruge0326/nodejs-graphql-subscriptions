import { execute } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import * as ws from 'ws'
import gql from 'graphql-tag'

interface ConnectionParams {
  [paramName: string]: any
}

type GetSubscriptionParams = {
  url: string
  query: string
  variables?: any
  connectionParams: ConnectionParams
  onData: (value: object) => void
  onError: (error: any) => void
}

const getWsClient = function (wsurl: string, connectionParams: ConnectionParams) {
  const client = new SubscriptionClient(wsurl, { reconnect: true, connectionParams }, ws)
  return client
}

const createSubscriptionObservable = (wsurl: string, query: string, variables: any, connectionParams: ConnectionParams) => {
  const link = new WebSocketLink(getWsClient(wsurl, connectionParams))
  return execute(link, {
    query: gql`
      ${query}
    `,
    variables: variables,
  })
}

export const getSubscription = ({ url, query, variables, onData, onError, connectionParams }: GetSubscriptionParams) => {
  const subscriptionClient = createSubscriptionObservable(url, query, variables, connectionParams)
  return subscriptionClient.subscribe(onData, onError)
}
